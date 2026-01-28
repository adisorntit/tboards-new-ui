
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
async function geOutputs() {
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
async function getData(path) {
    const ret = await fetch(HOST+path,{
        method:"GET",
        headers:{
            "authorization":`Basic ${AUTH}`
        }
    }).then(r=>r.json())
    return ret?ret:null
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
    // { name:"mod_read", title:"การอ่าน MODBUS RTU", path:"/mod_read" },
    // { name:"mod_write", title:"การเขียน MODBUS RTU", path:"/mod_write" },
    { name:"modbus", title:"มอดบัส", path:"/modbus" },
    { name:"io", title:"อินพุต/เอาท์พุต", path:"/io" },
    // { name:"actionbtn", title:"ปุ่มแอ็คชั่น", path:"/action" },
    // { name:"ping", title:"PING", path:"/ping" },
    // { name:"dataslots", title:"ช่องเก็บข้อมูล", path:"/dataslots" },
    // { name:"contact", title:"ช่องทางการแจ้งเตือน", path:"/contact" },
    // { name:"extraCmd", title:"การรับคำสั่ง", path:"/extraCmd" },
    { name:"scene", title:"ซีน", path:"/scene" },
    { name:"more", title:"เพิ่มเติม...", path:"/more" },
    { name:"tools", title:"เครื่องมือ", path:"/tools" },
    { name:"logout", title:"ออกจากระบบ", path:"/logout" },
]
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
            itemEle.onclick = ()=>{
                location.href = x.path + `.html` //.html for test
            }
            el.appendChild(itemEle)
        })
    }

    if(document.querySelector(`.btn-group`))
    {
        const el = document.querySelector(`.btn-group`)
        el.innerHTML = `<button id="top-update-reboot-btn" class="btn-yellow" style="display: none;">อัพเดทข้อมูล+รีบู๊ต</button>`
        el.innerHTML += `<button id="top-cancel-update-btn" class="btn-red" style="display: none;">ยกเลิก</button>`
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
            update_btn.onclick = ()=>{ // for update all
                alert("Success...")
                this.clearItems(uniqueName)
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
    static clearItems(uniqueName="sample"){
        window.localStorage.setItem(`${uniqueName}-updateData`, "[]")
        this.checkUpdateDataBtn(uniqueName)
        location.reload()
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
window.MAC = ""
window.HOST = "http://192.168.56.82" // for test
window.AUTH = btoa(`admin:admin`) // for test
async function main() {
    LOADING.display()
    const retMac = await getMac()
    MAC = `samplemac` // for sample
    if(retMac&&retMac.mac)
    {
        MAC = retMac.mac
    }
    makeMenu()
    setMenuActive()
    UPDATEDATA.checkUpdateDataBtn(MAC)
}

/************* */