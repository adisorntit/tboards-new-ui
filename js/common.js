
async function getMac() {
    const ret = await getData(`/mac`)
    return ret?ret:""
}
async function getNw() {
    const ret = await getData(`/get_nwconfig`)
    return ret?ret:null
}
async function wifiScan() {
    const ret = await getData(`/get_wifiscan`)
    return ret?ret:[]
}
async function getMqttCfg() {
    const ret = await getData(`/mqttconfig`)
    return ret?ret:null
}
async function getInputs() {
    const ret = await getData(`/get_inputs`)
    return ret?ret:[]
}
async function getOutputs() {
    const ret = await getData(`/get_outputs`)
    return ret?ret:[]
}
async function getFirmwaresList() {
    const ret = await getData(`/firmwares_list`)
    return ret?ret:[]
}
async function getFirmwareVersion() {
    const ret = await getDataText(`/fw_version`)
    return ret?ret:null
}
async function getTimeOffset() {
    const ret = await getData(`/timeoffset`)
    return ret?ret:null
}
async function getScene() {
    const ret = await getData(`/scene/sc.json`)
    return ret?ret:[]
}
async function getContact() {
    const ret = await getData(`/contact/contact.json`)
    return ret?ret:[]
}
async function getActionbtn() {
    const ret = await getData(`/customs/actionbtn.json`)
    return ret?ret:[]
}
async function getPing() {
    const ret = await getData(`/customs/ping.json`)
    return ret?ret:[]
}
async function getModbusWrite() {
    const ret = await getData(`/modbus/write.json`)
    return ret?ret:[]
}
async function getModbusRead() {
    const ret = await getData(`/modbus/read.json`)
    return ret?ret:[]
}
async function getModbusRead2() {
    const ret = await getData(`/modreaddata`)
    return ret?ret:null
}
async function getModbusReadTemplatesJson() {
    const ret = await getData(`/modbus/read_templates.json`)
    return ret?ret:null
}
async function getDataslots() {
    const ret = await getData(`/customs/dataslots.json`)
    return ret?ret:[]
}
async function getMaxItems() {
    const ret = await getData(`/get_maxItems`)
    return ret?ret:null
}
async function getUpgradeStatus() {
    const ret = await getData(`/upgradeStatus`)
    return ret?ret:null
}
async function getVariables2() {
    const ret = await getData(`/get_variables2`)
    return ret?ret:null
}
async function getRealtime_data() {
    const ret = await getData(`/realtime_data`)
    return ret?ret:null
}
async function getHeap_usage() {
    const ret = await getDataText(`/heap_usage`)
    return ret?ret:null
}
async function getModbusReadTemplates() {
    let templates = []
    try {
        let templates_id = await getModbusReadTemplatesJson()
        for (let index = 0; index < templates_id.length; index++) {
            const template_item = templates_id[index];
            let templates_details = await getData(`./modbus/templates/${template_item}.json`)
            templates.push(templates_details)
        }
    } catch (error) {
        console.log(error.message)        
    }
    return templates
}

/****************/
function inputTextEnFilter(e){
    const element = e.currentTarget
    const value = element.value
    const allow = "abcdefghijklmnopqrstuvwxyz_"
    const allow2 = "1234567890"
    for (let index = 0; index < value.length; index++) {
        const c = value[index];
        if(allow.indexOf(c)<0&&allow.toUpperCase().indexOf(c)<0&&allow2.indexOf(c)<0){
            element.value = value.substring(0,value.length-1)
            break
        }
    }
}
function inputVariableFilter(e)
{
    e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z0-9_]/g, '');
}
function inputNumberFilter(e){
    const element = e.currentTarget
    const value = element.value
    const allow = "1234567890"
    for (let index = 0; index < value.length; index++) {
        const c = value[index];
        if(allow.indexOf(c)<0){
            element.value = value.substring(0,value.length-1)
            break
        }
    }
}
/****************/

async function getData(path) {
    const MAX_RETRIES = 5; // จำนวนครั้งที่จะลองใหม่
    const DELAY = 2000;    // รอ 2 วินาทีก่อนลองใหม่ (เผื่อให้ Server มีเวลาฟื้นตัว)

    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const response = await fetch(HOST + path, {
                method: "GET",
                headers: {
                    "authorization": `Basic ${AUTH}`
                },
                timeout:5000
            });
            if(response.status==401)
            {
                location.reload()
                break
            }
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            return data ? data : null;

        } catch (error) {
            console.log(`Attempt ${i + 1} failed. Retrying...`);
            
            // ถ้าเป็นการลองครั้งสุดท้ายแล้วยังพัง ให้ return null หรือ throw error
            if (i === MAX_RETRIES - 1) {
                console.error("Max retries reached. Server is likely down.");
                return null;
            }

            // รอสักพักก่อนลองรอบถัดไป
            await new Promise(resolve => setTimeout(resolve, DELAY));
        }
    }
}
async function getDataText(path) {
    const ret = await fetch(HOST+path,{
        method:"GET",
        headers:{
            "authorization":`Basic ${AUTH}`
        }
    }).then(r=>r.text())
    return ret?ret:""
}
async function postData(path, contentType=null, body=null) {
    
    let options = {
        method:"POST",
        headers:{
            "authorization":`Basic ${AUTH}`
        }
    }
    if(contentType)
    {
        if(String(contentType).toLowerCase()=="application/json")
        {
            Object.assign(options.headers, {
                "content-type":contentType
            })
            if(body&&typeof body == "object"){
                Object.assign(options, {
                    body:JSON.stringify(body)
                })
            }
        }
    }
    const ret = await fetch(HOST+path,options).then(r=>r.json())
    return ret?ret:null
}
async function reboot() {
    LOADING.display("อุปกรณ์กำลังรีบู๊ต...")
    const ret = await getData(`/reboot`)
    console.log(ret)    
}
function stringIsJsonFormat(str)
{
    try {
        return JSON.parse(str)
    } catch (error) {
        return false
    }
}
async function readStringFromFile(file) {
    return await new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = function () {
            const readtext = reader.result;
            resolve(readtext)
        };
    
        reader.onerror = function () {
            console.error('Error reading the file');
            reject("");
        };
    
        reader.readAsText(file, 'utf-8');
    })
}
/****************/
const menu_list = [
    { name:"home", title:"หน้าแรก", path:"/home" },
    { name:"nw", title:"ตั้งค่าเน็ตเวิร์ค", path:"/nw" },
    { name:"mqtt", title:"ตั้งค่า MQTT", path:"/mqtt" },
    { name:"modbus", title:"มอดบัส", path:"/modbus" },
    { name:"io", title:"อินพุต/เอาท์พุต", path:"/io" },
    { name:"scene", title:"ซีน", path:"/scene" },
    { name:"more", title:"เพิ่มเติม...", path:"/more" },
    { name:"tools", title:"เครื่องมือ", path:"/tools" },
    { name:"logout", title:"ออกจากระบบ", path:"/logout" },
]
// window.ROOT_DIR = "/tboards/local"
window.ROOT_DIR = "."
function makeMenu()
{
    if(document.querySelector(`.m-left-menu`))
    {
        const el = document.querySelector(`.m-left-menu`)
        el.innerHTML = ``
        menu_list.map(x=>{
            const itemEle = document.createElement("item")
            itemEle.dataset.name = x.name
            itemEle.dataset.title = x.title
            itemEle.dataset.active = "false"
            itemEle.textContent = x.title
            itemEle.onclick = async ()=>{
                if(x.name=="logout")
                {                    
                    // setTimeout(() => {
                    // }, 200);
                    const ret = await getData(`/logout`) 
                    window.localStorage.removeItem(`tboard-ip`) 
                    window.localStorage.removeItem(`tboard-auth`) 
                    window.HOST = ""
                    window.location.reload()
                }else{
                    location.href = ROOT_DIR + x.path + `.html` //.html for test
                }
            }
            el.appendChild(itemEle)
        })
    }

    if(document.querySelector(`.bg-group`))
    {
        const el = document.querySelector(`.bg-group`)
        el.innerHTML = `<button id="top-update-reboot-btn" class="bg-yellow" style="display: none;">อัพเดทข้อมูล+รีบู๊ต</button>`
        el.innerHTML += `<button id="top-cancel-update-btn" class="bg-red" style="display: none;">ยกเลิก</button>`
    }
}
function setMenuActive(){
    let pathname = window.location.pathname
    pathname = pathname.split("/").filter(x=>x!="")
    if(pathname.length===0){ return }    
    const pagename = pathname[0].replace(".html","") //.html for test
    
     if(document.querySelector(`.m-left-menu`))
    {
        const el = document.querySelector(`.m-left-menu`)
        const items = [...el.children]
        for(const item of items)
        {
            const name = item.dataset.name
            const title = item.dataset.title
            if(name==pagename && item.dataset.active != "true"){
                item.dataset.active = "true"
                item.classList.add("active")
                if(document.querySelector(`#top-title`)&&document.querySelector(`#top-pagename`))
                {
                    document.querySelector(`#top-title`).textContent = `T-BOARD GEN3 | `
                    document.querySelector(`#top-pagename`).textContent = title
                }
            }else{
                item.dataset.active = "false"
                item.classList.remove("active")
            }
        }
    }
}

class UPDATEDATA{
    static checkUpdateDataBtn(uniqueName="sample")
    {
        if(!window.localStorage.getItem(`${uniqueName}-updateData`)){
            window.localStorage.setItem(`${uniqueName}-updateData`, "[]")
        }
        const updateDataStorage = window.localStorage.getItem(`${uniqueName}-updateData`)
        const updateData = JSON.parse(updateDataStorage)    
        if(document.querySelector(`#top-update-reboot-btn`)
            &&document.querySelector(`#top-cancel-update-btn`)
            &&updateData)
        {
            const update_btn = document.querySelector(`#top-update-reboot-btn`)
            const cancel_btn = document.querySelector(`#top-cancel-update-btn`)
            update_btn.style.display = updateData.length==0?"none":"inline-flex"
            cancel_btn.style.display = updateData.length==0?"none":"inline-flex"
            cancel_btn.onclick = ()=>{
                this.clearItems(uniqueName)
            }
            update_btn.onclick = async ()=>{ // for update all
                alert("Success...")
                const updateDataStorage = window.localStorage.getItem(`${uniqueName}-updateData`)
                const updateData = JSON.parse(updateDataStorage)
                // console.log(updateData);
                let json = {}
                for (const item of updateData) {
                    json[item["name"]] = item["data"]
                }
                console.log(json);
                await applySettings(json, "อัพเดทข้อมูล")
                this.clearItems(uniqueName, false)
                
            }
        }
    }
    static addItem(uniqueName="sample", name, data)
    {
        const itemIndex = this.findItemIndex(uniqueName, name)
        let allItems = this.getItems(uniqueName)
        if(itemIndex>=0){
            allItems[itemIndex] = { name, data }
        }else{
            allItems.push({ name, data })
        }
        const dataStr = JSON.stringify(allItems)
        window.localStorage.setItem(`${uniqueName}-updateData`, dataStr)
        this.checkUpdateDataBtn(uniqueName)
    }
    static findItem(uniqueName="sample", name)
    {
        const items = this.getItems(uniqueName)
        const filter = items.filter(x=>x.name === name)
        return filter.length==1?filter[0]:null
    }
    static findItemIndex(uniqueName="sample", name)
    {
        const items = this.getItems(uniqueName)
        const index = items.findIndex(x=>x.name === name)
        return index
    }
    static getItems(uniqueName="sample")
    {
        if(window.localStorage.getItem(`${uniqueName}-updateData`)){
            const updateDataStorage = window.localStorage.getItem(`${uniqueName}-updateData`)
            return JSON.parse(updateDataStorage)
        }else{
            return []
        }
    }
    static clearItems(uniqueName="sample", reload=true){
        window.localStorage.setItem(`${uniqueName}-updateData`, "[]")
        this.checkUpdateDataBtn(uniqueName)
        if(reload)
        {
            location.reload()
        }
    }
}
class LOADING{
    static display(message="loading..."){
        this.hide()
        const loadingEle = document.createElement("div")
        loadingEle.id = "loadingEle"
        loadingEle.style.cssText = `position: fixed; inset:0;
        z-index:9999;
        color:#F8FAFC; background-color:rgba(39, 39, 42, 0.9);
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:1.2rem;
        transition:.3s;
        `
        loadingEle.innerHTML = `<span>${message}</span>`
        document.body.appendChild(loadingEle)
    }
    static hide(){
        if(document.body.querySelector(`#loadingEle`))
        {
            document.body.querySelector(`#loadingEle`).remove()
        }
    }
}
let modal_zindex = 99
class MODAL{
    constructor(noExit=false)
    {
        modal_zindex+=1;
        this.id = new Date().getTime()
        this.element = document.createElement("div")
        this.element.style.cssText = `position:fixed;
        inset:0;
        z-index:${modal_zindex};
        display:flex;
        justify-content: center;
        align-items: top;
        padding:1rem;
        background-color: rgba(28, 40, 51, 0.8);`
        this.frame_content = document.createElement("div")
        this.frame_content.style.cssText = `position:relative;
        display:block;
        padding:1rem;
        width:100%;max-width:768px;
        height:auto;max-height:100%;`
        this.content = document.createElement("div")
        this.content.style.cssText = `position:relative;
        display:block;
        background-color: rgba(248, 248, 248);
        padding:1rem;
        max-width:100%;
        max-height:100%;
        overflow:auto;`
        this.exitBtn = document.createElement("div")
        this.exitBtn.style.cssText = `position:absolute;
        top:0;
        right:0;
        display:flex;
        justify-content: center;
        align-items: center;
        cursor:pointer;
        background-color: rgba(169, 50, 38);
        color: rgba(248, 249, 249);
        width:1rem;height:1rem;`
        this.exitBtn.innerHTML = `x`
        if(!noExit)
        {
            this.frame_content.appendChild(this.exitBtn)
        }
        this.frame_content.appendChild(this.content)
        this.element.appendChild(this.frame_content)
        this.exitBtn.onclick = (e)=>{
            this.clear(this.element)
        }
    }
    setContent({contentHtml=""}={})
    {
        this.content.innerHTML = contentHtml
    }
    appendContent({node}={})
    {
        if(node!=undefined&&node!=null)
        {
            this.content.appendChild(node)
        }
    }
    show()
    {
        if(document.querySelector(`body`)!=null)
        {
            document.querySelector(`body`).appendChild(this.element)
        }
    }
    hide()
    {
        this.clear(this.element)
    }
    clear(element)
    {
        modal_zindex-=1
        this.element.remove()
    }
}

async function applySettings(json, subject="นำเข้าข้อมูล") {
    if(json){
        LOADING.display(`กำลัง${subject}การตั้งค่า...`)
        const keys = Object.keys(json)
        let all = 0
        let c = 0
        for (const key of keys) {
            const readItem = json[key]
            if(key=="template_items")
            {
                for (let tp_idx = 0; tp_idx < readItem.length; tp_idx++) {
                    const tpItem = readItem[tp_idx];
                    all+=1
                    let jsonBody = {
                        item_id:tpItem["item_id"],
                        data:tpItem
                    }
                    const ret = await postData("/modbus/templates/download","application/json",jsonBody)
                    if(ret&&ret.status&&ret.status=="success"){ c++ }
                }
            }else{
                let _path = get_post_path(key)
                if(_path!="")
                {
                    all+=1
                    const ret = await postData(_path,"application/json",readItem)
                    if(ret&&ret.status&&ret.status=="success"){ c++ }
                }
            }
            
            LOADING.display(`${subject} ${all} สำเร็จ ${c} ... ต้องรีบู๊ตอุปกรณ์`)
        }


        setTimeout(()=>{ reboot() }, 2000)
        setTimeout(()=>{
            window.location.reload()
        }, 6000)
        
    }else{
        LOADING.display(`${subject}ผิดพลาด...`)
    }
}

function get_post_path(content){
    let path = ""
    switch (content) {
        case "inputs":
            path = "/inputs"
            break;
        case "outputs":
            path = "/outputs"
            break;
        case "actionbtn":
            path = "/actionbtn"
            break;
        case "actionBtn":
            path = "/actionbtn"
            break;
        case "ping":
            path = "/ping"
            break;
        case "modread":
            path = "/mod_read"
            break;
        case "modbusRead":
            path = "/mod_read"
            break;
        case "modwrite":
            path = "/mod_write"
            break;
        case "modbusWrite":
            path = "/mod_write"
            break;
        case "contact":
            path = "/contact"
            break;
        case "contacts":
            path = "/contact"
            break;
        case "scene":
            path = "/scene"
            break;
        case "scenes":
            path = "/scene"
            break;
        case "timeoffset":
            path = "/timeoffset"
            break;
        case "dataslots":
            path = "/dataslots"
            break;
        case "mqtt":
            path = "/mqttconfig"
            break;
        case "network":
            path = "/nwconfig"
            break;
        case "auth":
            path = "/adminpassword"
            break;
        default:
            break;
    }
    return path
}

function getCalcItems(parent){
    let cal = []
    const calcItems = [...parent.children]
    calcItems.map(y=>{
        const calcOperatorSelect = y.querySelector(`#calcOperatorSelect`)
        const calcOperandInput = y.querySelector(`#calcOperandInput`)
        let operator = calcOperatorSelect.value.replace("f","").replace("r","")
        let pos = calcOperatorSelect.value.replace("+","").replace("-","").replace("*","").replace("/","")
        let operand = isNaN(parseFloat(calcOperandInput.value))?0:parseFloat(calcOperandInput.value)
        cal.push({
            operator,
            pos,
            operand
        })
    })
    return cal
}

window.MAC = ""
window.HOST = "" // for test
window.AUTH = ""
async function main() {
    LOADING.display()
    makeMenu()
    setMenuActive()
    if(!window.localStorage.getItem(`tboard-ip`)){
        const container = document.createElement("form")
        const nameInput = document.createElement("input")
        nameInput.type = "text"
        nameInput.id = "name"
        nameInput.placeholder = "ไอพีบอร์ด"
        nameInput.style.border = "solid 0.11rem #DDD"
        const nameLabel = document.createElement("label")
        nameLabel.textContent = `ไอพีบอร์ด`
        const nameGroupEle = document.createElement("div")
        nameGroupEle.className = `form-group-h`
        nameGroupEle.style.justifyContent = "center"
        nameGroupEle.appendChild(nameLabel)
        nameGroupEle.appendChild(nameInput)

        const userInput = document.createElement("input")
        userInput.type = "text"
        userInput.id = "username"
        userInput.placeholder = "ยูสเซอร์เนม"
        userInput.style.border = "solid 0.11rem #DDD"
        const userLabel = document.createElement("label")
        userLabel.textContent = `ยูสเซอร์เนม`
        const userGroupEle = document.createElement("div")
        userGroupEle.className = `form-group-h`
        userGroupEle.style.justifyContent = "center"
        userGroupEle.appendChild(userLabel)
        userGroupEle.appendChild(userInput)

        const passInput = document.createElement("input")
        passInput.type = "password"
        passInput.id = "password"
        passInput.placeholder = "รหัสผ่าน"
        passInput.style.border = "solid 0.11rem #DDD"
        const passLabel = document.createElement("label")
        passLabel.textContent = `รหัสผ่าน`
        const passGroupEle = document.createElement("div")
        passGroupEle.className = `form-group-h`
        passGroupEle.style.justifyContent = "center"
        passGroupEle.appendChild(passLabel)
        passGroupEle.appendChild(passInput)

        const submitBtn = document.createElement("button")
        submitBtn.type = "submit"
        submitBtn.className = `bg-blue`
        submitBtn.style.maxWidth = "max-content"
        submitBtn.style.margin = "0 auto"
        submitBtn.textContent = "บันทึก"
        
        container.appendChild(nameGroupEle)
        container.appendChild(userGroupEle)
        container.appendChild(passGroupEle)
        container.appendChild(submitBtn)

        container.onsubmit = (e)=>{
            e.preventDefault()
            if(nameInput&&nameInput.value!="")
            {
                window.localStorage.setItem(`tboard-ip`, nameInput.value)
                window.localStorage.setItem(`tboard-auth`, btoa(`${userInput.value}:${passInput.value}`))
                window.location.reload()
            }
        }
        let modal = new MODAL(true)
        modal.setContent({contentHtml:``})
        modal.appendContent({node:container})
        modal.show()

        LOADING.hide()
        return false
        // const ip = prompt("ไอพีของ T-Board")
        // window.localStorage.setItem(`tboard-ip`,ip)
        // window.HOST = `http://${ip}`
    }
    window.HOST = `http://${window.localStorage.getItem(`tboard-ip`)}`
    window.AUTH = window.localStorage.getItem('tboard-auth')
    const retMac = await getMac()
    if(!retMac){
        window.localStorage.removeItem(`tboard-ip`) 
        window.localStorage.removeItem(`tboard-auth`) 
        window.HOST = ""
        window.location.reload()
        return false
    }
    MAC = `samplemac` // for sample
    const titleTag = document.querySelector(`title`)
    titleTag.textContent = `T-BOARD GEN3 (UI2026) [${window.localStorage.getItem(`tboard-ip`)}]`
    if(retMac&&retMac.mac)
    {
        MAC = retMac.mac
        UPDATEDATA.checkUpdateDataBtn(MAC)
        return true
    }else{
        const el = document.querySelector(`.m-left-menu`)
        const childrens = [...el.children]
        for (const element of childrens) {
            if(element.dataset.name=="logout"){
                element.dispatchEvent(new Event("click"))
                break
            }
        }
        return false
    }
}


/************* */