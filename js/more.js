async function displayActionBtnList() {
        const addItemBtn = document.createElement("button")
        addItemBtn.className = `bg-primary`
        addItemBtn.textContent = `เพิ่ม`
        addItemBtn.onclick = add_new_actionBtn
        const submitItemBtn = document.createElement("button")
        submitItemBtn.className = `bg-blue`
        submitItemBtn.textContent = `บันทึกรายการ`
        submitItemBtn.type = `submit`
        submitItemBtn.setAttribute("form", "form-actionBtn")

        const btnGroupBottomEle = document.createElement("div")
        btnGroupBottomEle.className = "form-group-h"
        btnGroupBottomEle.appendChild(addItemBtn)
        btnGroupBottomEle.appendChild(submitItemBtn)

        ctrlGroup.appendChild(btnGroupBottomEle)

        const formEle = document.createElement("form")
        formEle.id = "form-actionBtn"
        dataArea.appendChild(formEle)

        let data = []
        if(UPDATEDATA.findItem(MAC, "actionBtn")){
            const storageData = UPDATEDATA.findItem(MAC, "actionBtn")
            data = storageData.data
        }else{
            data = await getActionbtn()          
        }

        for (const item of data) {
            const { item_id, name } = item || {}
            add_new_actionBtn(item_id)
            const itemsAll = [...formEle.children]
            if(itemsAll[itemsAll.length-1])
            {
                const itemEle = itemsAll[itemsAll.length-1]
                itemEle.querySelector(`#name`).value = name
            }
        }
        
        formEle.onsubmit = (e)=>{
            e.preventDefault()
            const itemsAll = [...formEle.children]
            let updateData = []
            for (const itemEle of itemsAll) {
                const item_id = parseInt(itemEle.dataset.item_id)
                const nameEle = itemEle.querySelector(`#name`)
                updateData=[...updateData,{
                    item_id, name:nameEle.value
                }]
            }
            console.log(updateData)
            UPDATEDATA.addItem(MAC, "actionBtn", updateData)
            tab_actionBtn.dispatchEvent( new Event("click") )
        }

        LOADING.hide()
    }
    function add_new_actionBtn(id)
    {
        let new_id = new Date().getTime()
        new_id = Math.floor(new_id/1000)
        id = typeof id == "object"?new_id:id
        id = typeof id == "number"?id:new_id
        const formEle = dataArea.querySelector("form")
        const itemsAll = [...formEle.children]
        if(itemsAll.length >= MAX_ITEMS["actionbtn"]){ alert("จำนวนครบ "+ MAX_ITEMS["actionbtn"] +" แล้ว"); return}
        if(itemsAll.filter(x=>x.dataset.item_id === String(id)).length > 0){ return }
        const itemEle = document.createElement("div")
        itemEle.className = "form-group-v border-basic"
        itemEle.dataset.item_id = id

        const buttonsGroup = document.createElement("div")
        buttonsGroup.className = "form-group-h form-group-wrap"
        const deleteBtn = document.createElement("button")
        deleteBtn.type = "button"
        deleteBtn.className = "bg-red"
        deleteBtn.textContent = "ลบ"
        deleteBtn.onclick = ()=>{
            itemEle.remove()
        }
        const itemIdLabel = document.createElement("label")
        itemIdLabel.textContent = `item_id : ${id}`
        buttonsGroup.appendChild(deleteBtn)
        buttonsGroup.appendChild(itemIdLabel)

        const nameGroup = document.createElement("div")
        nameGroup.className = "form-group-h form-group-wrap"
        const nameLabel = document.createElement("label")
        nameLabel.textContent = "ป้ายชื่อ"
        const nameInput = document.createElement("input")
        nameInput.type = "text"
        nameInput.id = "name"
        nameInput.maxLength = 30
        nameInput.required = true
        nameInput.placeholder = nameLabel.textContent
        nameGroup.appendChild(nameLabel)
        nameGroup.appendChild(nameInput)

        itemEle.appendChild(buttonsGroup)
        itemEle.appendChild(nameGroup)

        formEle.appendChild(itemEle)
    }
    /****************/
    async function displayPingList() {
        const addItemBtn = document.createElement("button")
        addItemBtn.className = `bg-primary`
        addItemBtn.textContent = `เพิ่ม`
        addItemBtn.onclick = add_new_ping
        const submitItemBtn = document.createElement("button")
        submitItemBtn.className = `bg-blue`
        submitItemBtn.textContent = `บันทึกรายการ`
        submitItemBtn.type = `submit`
        submitItemBtn.setAttribute("form", "form-ping")

        const btnGroupBottomEle = document.createElement("div")
        btnGroupBottomEle.className = "form-group-h"
        btnGroupBottomEle.appendChild(addItemBtn)
        btnGroupBottomEle.appendChild(submitItemBtn)

        ctrlGroup.appendChild(btnGroupBottomEle)

        const formEle = document.createElement("form")
        formEle.id = "form-ping"
        dataArea.appendChild(formEle)

        let data = []
        if(UPDATEDATA.findItem(MAC, "ping")){
            const storageData = UPDATEDATA.findItem(MAC, "ping")
            data = storageData.data
        }else{
            data = await getPing()          
        }

        for (const item of data) {
            const { item_id, name, addr, interval } = item || {}
            const variable = item.var || undefined
            add_new_ping(item_id)
            const itemsAll = [...formEle.children]
            if(itemsAll[itemsAll.length-1])
            {
                const itemEle = itemsAll[itemsAll.length-1]
                itemEle.querySelector(`#variable`).value = variable
                itemEle.querySelector(`#name`).value = name
                itemEle.querySelector(`#addr`).value = addr
                itemEle.querySelector(`#interval`).value = interval
            }
        }
        
        formEle.onsubmit = (e)=>{
            e.preventDefault()
            const itemsAll = [...formEle.children]
            let updateData = []
            for (const itemEle of itemsAll) {
                const item_id = parseInt(itemEle.dataset.item_id)
                const variableEle = itemEle.querySelector(`#variable`)
                const nameEle = itemEle.querySelector(`#name`)
                const addrEle = itemEle.querySelector(`#addr`)
                const intervalEle = itemEle.querySelector(`#interval`)
                updateData=[...updateData,{
                    item_id,
                    var:variableEle.value,
                    name:nameEle.value,
                    addr:addrEle.value,
                    interval:parseInt(intervalEle.value)
                }]
            }
            console.log(updateData)
            UPDATEDATA.addItem(MAC, "ping", updateData)
            tab_ping.dispatchEvent( new Event("click") )
        }

        LOADING.hide()
    }

    function add_new_ping(id)
    {
        let new_id = new Date().getTime()
        new_id = Math.floor(new_id/1000)
        id = typeof id == "object"?new_id:id
        id = typeof id == "number"?id:new_id
        const formEle = dataArea.querySelector("form")
        const itemsAll = [...formEle.children]
        if(itemsAll.length >= MAX_ITEMS["ping"]){ alert("จำนวนครบ "+ MAX_ITEMS["ping"] +" แล้ว"); return}
        if(itemsAll.filter(x=>x.dataset.item_id === String(id)).length > 0){ return }
        const itemEle = document.createElement("div")
        itemEle.className = "form-group-v border-basic"
        itemEle.dataset.item_id = id

        const buttonsGroup = document.createElement("div")
        buttonsGroup.className = "form-group-h form-group-wrap"
        const deleteBtn = document.createElement("button")
        deleteBtn.type = "button"
        deleteBtn.className = "bg-red"
        deleteBtn.textContent = "ลบ"
        deleteBtn.onclick = ()=>{
            itemEle.remove()
        }
        const itemIdLabel = document.createElement("label")
        itemIdLabel.textContent = `item_id : ${id}`
        buttonsGroup.appendChild(deleteBtn)
        buttonsGroup.appendChild(itemIdLabel)

        const nameGroup = document.createElement("div")
        nameGroup.className = "form-group-h form-group-wrap"
        const varLabel = document.createElement("label")
        varLabel.textContent = "ชื่อตัวแปร"
        const varInput = document.createElement("input")
        varInput.type = "text"
        varInput.id = "variable"
        varInput.maxLength = 20
        varInput.required = true
        varInput.placeholder = varLabel.textContent
        varInput.oninput = inputVariableFilter
        const nameLabel = document.createElement("label")
        nameLabel.textContent = "ป้ายชื่อ"
        const nameInput = document.createElement("input")
        nameInput.type = "text"
        nameInput.id = "name"
        nameInput.maxLength = 30
        nameInput.required = true
        nameInput.placeholder = nameLabel.textContent
        nameGroup.appendChild(varLabel)
        nameGroup.appendChild(varInput)
        nameGroup.appendChild(nameLabel)
        nameGroup.appendChild(nameInput)

        const addrGroup = document.createElement("div")
        addrGroup.className = "form-group-h form-group-wrap"
        const addrLabel = document.createElement("label")
        addrLabel.textContent = "IP Address / Domain"
        const addrInput = document.createElement("input")
        addrInput.type = "text"
        addrInput.id = "addr"
        addrInput.maxLength = 30
        addrInput.required = true
        addrInput.placeholder = addrLabel.textContent
        addrGroup.appendChild(addrLabel)
        addrGroup.appendChild(addrInput)

        const intervalGroup = document.createElement("div")
        intervalGroup.className = "form-group-h form-group-wrap"
        const itvLabel = document.createElement("label")
        itvLabel.textContent = "Ping ทุกๆ"
        const itvUnitLabel = document.createElement("label")
        itvUnitLabel.textContent = "วินาที"
        const itvInput = document.createElement("input")
        itvInput.type = "number"
        itvInput.id = "interval"
        itvInput.min = 5
        itvInput.max = 3600
        itvInput.value = 15
        itvInput.required = true
        itvInput.placeholder = itvLabel.textContent
        intervalGroup.appendChild(itvLabel)
        intervalGroup.appendChild(itvInput)
        intervalGroup.appendChild(itvUnitLabel)

        itemEle.appendChild(buttonsGroup)
        itemEle.appendChild(nameGroup)
        itemEle.appendChild(addrGroup)
        itemEle.appendChild(intervalGroup)

        formEle.appendChild(itemEle)
    }
    /****************/
    async function displayDataslotsList() {
        const addItemBtn = document.createElement("button")
        addItemBtn.className = `bg-primary`
        addItemBtn.textContent = `เพิ่ม`
        // addItemBtn.onclick = add_new_write_item
        const submitItemBtn = document.createElement("button")
        submitItemBtn.className = `bg-blue`
        submitItemBtn.textContent = `บันทึกรายการ`
        submitItemBtn.type = `submit`
        submitItemBtn.setAttribute("form", "form-dataslots")

        const btnGroupBottomEle = document.createElement("div")
        btnGroupBottomEle.className = "form-group-h"
        btnGroupBottomEle.appendChild(addItemBtn)
        btnGroupBottomEle.appendChild(submitItemBtn)

        ctrlGroup.appendChild(btnGroupBottomEle)

        const formEle = document.createElement("form")
        formEle.id = "form-dataslots"
        dataArea.appendChild(formEle)

        let data = null
        if(UPDATEDATA.findItem(MAC, "dataslots")){
            const storageData = UPDATEDATA.findItem(MAC, "dataslots")
            data = storageData.data
        }else{
            data = await getDataslots()  
        }
        for (const item of data) {
            const { name, type, value } = item || {}
            const _var = item.var || undefined

            const nameGroup = document.createElement("div")
            nameGroup.className = "form-group-h form-group-wrap"
            const varLabel = document.createElement("label")
            varLabel.textContent = "ชื่อตัวแปร"
            const varInput = document.createElement("input")
            varInput.type = "text"
            varInput.id = "variable"
            varInput.maxLength = 20
            varInput.required = true
            varInput.placeholder = varLabel.textContent
            varInput.oninput = inputVariableFilter
            const nameLabel = document.createElement("label")
            nameLabel.textContent = "ป้ายชื่อ"
            const nameInput = document.createElement("input")
            nameInput.type = "text"
            nameInput.id = "name"
            nameInput.maxLength = 30
            nameInput.required = true
            nameInput.placeholder = nameLabel.textContent
            nameGroup.appendChild(nameLabel)
            nameGroup.appendChild(nameInput)
            nameGroup.appendChild(varLabel)
            nameGroup.appendChild(varInput)

            const typeGroup = document.createElement("div")
            typeGroup.className = "form-group-h form-group-wrap"
            const typesLabel = document.createElement("label")
            typesLabel.textContent = "ชนิดข้อมูล"
            const typesSelect = document.createElement("select")
            typesSelect.id = "type"
            typesSelect.innerHTML = `
            <option value="int">จำนวนเต็ม (INT)</option>
            <option value="float">จำนวนทศนิยม (FLOAT)</option>
            `
            const nowValueLabel = document.createElement("label")
            const nowValueInput = document.createElement("input")
            nowValueInput.type = "number"
            nowValueInput.step = "any"
            nowValueInput.id = "nowValue"
            nowValueInput.required = true
            nowValueInput.placeholder = nowValueLabel.textContent
            
            typeGroup.appendChild(typesLabel)
            typeGroup.appendChild(typesSelect)
            typeGroup.appendChild(nowValueLabel)
            typeGroup.appendChild(nowValueInput)

            const itemEle = document.createElement("div")
            itemEle.className = "form-group-v border-basic"

            itemEle.appendChild(nameGroup)
            itemEle.appendChild(typeGroup)

            formEle.appendChild(itemEle)

            nameInput.value = name
            varInput.value = _var
            typesSelect.value = type
            typesSelect.onchange = ()=>{
                nowValueInput.value = 0
            }
            nowValueInput.value = value
        }                    

        formEle.onsubmit = (e)=>{
            e.preventDefault()
            const itemsAll = [...formEle.children]
            let updateData = []
            for (const itemEle of itemsAll) {
                const typesSelect = itemEle.querySelector(`#type`)
                const nowValueEle = itemEle.querySelector(`#nowValue`)
                const nameEle = itemEle.querySelector(`#name`)
                const variableEle = itemEle.querySelector(`#variable`)
                updateData=[...updateData,{
                    var:variableEle.value,
                    name:nameEle.value,
                    type:typesSelect.value,
                    value:typesSelect.value=="int"?parseInt(nowValueEle.value):parseFloat(nowValueEle.value)
                }]
            }
            console.log(updateData)
            UPDATEDATA.addItem(MAC, "dataslots", updateData)
            tab_dataslots.dispatchEvent( new Event("click") )
        }

        LOADING.hide()
    }
    /****************/
    async function displayContactsList() {
        const submitItemBtn = document.createElement("button")
        submitItemBtn.className = `bg-blue`
        submitItemBtn.textContent = `บันทึกรายการ`
        submitItemBtn.type = `submit`
        submitItemBtn.setAttribute("form", "form-contacts")

        const btnGroupBottomEle = document.createElement("div")
        btnGroupBottomEle.className = "form-group-h"
        btnGroupBottomEle.appendChild(submitItemBtn)

        ctrlGroup.appendChild(btnGroupBottomEle)

        const formEle = document.createElement("form")
        formEle.id = "form-contacts"
        dataArea.appendChild(formEle)
        /*** */
        const emailsParentEle = document.createElement("div")
        emailsParentEle.className = "form-group-v border-basic"
        emailsParentEle.id = "emailsParentEle"
        emailsParentEle.innerHTML = `<h3>อีเมล์</h3>`
        const emailItemsEle = document.createElement("div")
        emailItemsEle.className = "form-group-v"
        emailItemsEle.id = "emailItemsEle"
        const addEmailBtn = document.createElement("button")
        addEmailBtn.className = `btn`
        addEmailBtn.style.marginRight = `auto`
        addEmailBtn.id = `addEmailBtn`
        addEmailBtn.textContent = `เพิ่มอีเมล์`
        addEmailBtn.type = `button`
        emailsParentEle.appendChild(addEmailBtn)
        emailsParentEle.appendChild(emailItemsEle)
        addEmailBtn.onclick = addEmail
        
        const tgParentEle = document.createElement("div")
        tgParentEle.className = "form-group-v border-basic"
        tgParentEle.id = "tgParentEle"
        tgParentEle.innerHTML = `<h3>เทเลแกรม</h3>`
        const tgItemsEle = document.createElement("div")
        tgItemsEle.className = "form-group-v"
        tgItemsEle.id = "tgItemsEle"
        const addTgChatBtn = addEmailBtn.cloneNode(false)
        addTgChatBtn.id = `addTgChatBtn`
        addTgChatBtn.textContent = `เพิ่มห้องแชท`
        addTgChatBtn.type = `button`

        const tgBotTokenGroup = document.createElement("div")
        tgBotTokenGroup.className = "form-group-h form-group-wrap"
        const tgBotTokenLabel = document.createElement("label")
        tgBotTokenLabel.textContent = "Bot token"
        const tgBotTokenInput = document.createElement("input")
        tgBotTokenInput.type = "text"
        tgBotTokenInput.id = "tgBotToken"
        // tgBotTokenInput.required = true
        tgBotTokenInput.placeholder = tgBotTokenLabel.textContent
        tgBotTokenGroup.appendChild(tgBotTokenLabel)
        tgBotTokenGroup.appendChild(tgBotTokenInput)

        tgParentEle.appendChild(tgBotTokenGroup)
        tgParentEle.appendChild(addTgChatBtn)
        tgParentEle.appendChild(tgItemsEle)
        addTgChatBtn.onclick = addTgChat

        const lineParentEle = document.createElement("div")
        lineParentEle.className = "form-group-v border-basic"
        lineParentEle.id = "lineParentEle"
        lineParentEle.innerHTML = `<h3>ไลน์</h3>`
        const lineItemsEle = document.createElement("div")
        lineItemsEle.className = "form-group-v"
        lineItemsEle.id = "lineItemsEle"
        const addLineChatBtn = addEmailBtn.cloneNode(false)
        addLineChatBtn.id = `addLineChatBtn`
        addLineChatBtn.textContent = `เพิ่มห้องแชท`
        addLineChatBtn.type = `button`

        const lineAccessTokenGroup = document.createElement("div")
        lineAccessTokenGroup.className = "form-group-h form-group-wrap"
        const lineAccessTokenLabel = document.createElement("label")
        lineAccessTokenLabel.textContent = "Channel Access token"
        const lineAccessTokenInput = document.createElement("input")
        lineAccessTokenInput.type = "text"
        lineAccessTokenInput.id = "lineAccessTokenInput"
        // lineAccessTokenInput.required = true
        lineAccessTokenInput.placeholder = lineAccessTokenLabel.textContent
        lineAccessTokenGroup.appendChild(lineAccessTokenLabel)
        lineAccessTokenGroup.appendChild(lineAccessTokenInput)

        lineParentEle.appendChild(lineAccessTokenGroup)
        lineParentEle.appendChild(addLineChatBtn)
        lineParentEle.appendChild(lineItemsEle)
        addLineChatBtn.onclick = addLineChat

        const telParentEle = document.createElement("div")
        telParentEle.className = "form-group-v border-basic"
        telParentEle.id = "telParentEle"
        telParentEle.innerHTML = `<h3>เบอร์โทร</h3>`
        const telItemsEle = document.createElement("div")
        telItemsEle.className = "form-group-v"
        telItemsEle.id = "telItemsEle"
        const addTelNumberBtn = addEmailBtn.cloneNode(false)
        addTelNumberBtn.id = `addTelNumberBtn`
        addTelNumberBtn.textContent = `เพิ่มเบอร์โทร`
        addTelNumberBtn.type = `button`
        telParentEle.appendChild(addTelNumberBtn)
        telParentEle.appendChild(telItemsEle)
        addTelNumberBtn.onclick = addTelNumber

        const tboardParentEle = document.createElement("div")
        tboardParentEle.className = "form-group-v border-basic"
        tboardParentEle.id = "tboardParentEle"
        tboardParentEle.innerHTML = `<h3>T-Board</h3>`
        const tboardItemsEle = document.createElement("div")
        tboardItemsEle.className = "form-group-v"
        tboardItemsEle.id = "tboardItemsEle"
        const addTBoardClientBtn = addEmailBtn.cloneNode(false)
        addTBoardClientBtn.id = `addTBoardClientBtn`
        addTBoardClientBtn.textContent = `เพิ่ม Client ID`
        addTBoardClientBtn.type = `button`
        tboardParentEle.appendChild(addTBoardClientBtn)
        tboardParentEle.appendChild(tboardItemsEle)
        addTBoardClientBtn.onclick = addTBoardClient

        formEle.appendChild(emailsParentEle)
        formEle.appendChild(tgParentEle)
        formEle.appendChild(lineParentEle)
        formEle.appendChild(telParentEle)
        formEle.appendChild(tboardParentEle)
        /*** */

        let data = null
        if(UPDATEDATA.findItem(MAC, "contacts")){
            const storageData = UPDATEDATA.findItem(MAC, "contacts")
            data = storageData.data
        }else{
            data = await getContact()          
        }
        
        if(data)
        {
            console.log(data);
            const { email, linemessaging, tboard, tel, telegram } = data || {}
            if(email&&Array.isArray(email)){
                for (const item of email) {
                    const { item_id, enabled, name, email } = item || {}
                    addEmail(item_id)
                    const emailItemsEle = formEle.querySelector(`#emailItemsEle`)
                    const childs = [...emailItemsEle.children]
                    if(childs[childs.length-1]){
                        const itemEle = childs[childs.length-1]
                        itemEle.querySelector(`#enabled`).checked = enabled
                        itemEle.querySelector(`#name`).value = name
                        itemEle.querySelector(`#email`).value = email
                    }
                }
            }
            if(linemessaging){
                const { access_token, room_id } = linemessaging || {}
                lineAccessTokenInput.value = access_token
                if(room_id&&Array.isArray(room_id)){
                    for (const item of room_id) {
                        const { item_id, enabled, name, room_id } = item || {}
                        addLineChat(item_id)
                        const lineItemsEle = formEle.querySelector(`#lineItemsEle`)
                        const childs = [...lineItemsEle.children]
                        if(childs[childs.length-1]){
                            const itemEle = childs[childs.length-1]
                            itemEle.querySelector(`#enabled`).checked = enabled
                            itemEle.querySelector(`#name`).value = name
                            itemEle.querySelector(`#chatId`).value = room_id
                        }
                    }
                }
            }
            if(tboard&&Array.isArray(tboard)){
                for (const item of tboard) {
                    const { item_id, enabled, name, client_id, auth } = item || {}
                    addTBoardClient(item_id)
                    const tboardItemsEle = formEle.querySelector(`#tboardItemsEle`)
                    const childs = [...tboardItemsEle.children]
                    if(childs[childs.length-1]){
                        const itemEle = childs[childs.length-1]
                        itemEle.querySelector(`#enabled`).checked = enabled
                        itemEle.querySelector(`#name`).value = name
                        itemEle.querySelector(`#clientId`).value = client_id
                        const authSplit = atob(auth).split(":")
                        const password = authSplit.length==2?authSplit[1]:""
                        itemEle.querySelector(`#password`).value = password
                    }
                }
            }
            if(tel&&Array.isArray(tel)){
                for (const item of tel) {
                    const { item_id, enabled, name, telnumber } = item || {}
                    addTelNumber(item_id)
                    const telItemsEle = formEle.querySelector(`#telItemsEle`)
                    const childs = [...telItemsEle.children]
                    if(childs[childs.length-1]){
                        const itemEle = childs[childs.length-1]
                        itemEle.querySelector(`#enabled`).checked = enabled
                        itemEle.querySelector(`#name`).value = name
                        itemEle.querySelector(`#tel`).value = telnumber
                    }
                }
            }
            if(telegram){
                const { bot_token, chat_id } = telegram || {}
                tgBotTokenInput.value = bot_token
                if(chat_id&&Array.isArray(chat_id)){
                    for (const item of chat_id) {
                        const { item_id, enabled, name, chat_id } = item || {}
                        addTgChat(item_id)
                        const tgItemsEle = formEle.querySelector(`#tgItemsEle`)
                        const childs = [...tgItemsEle.children]
                        if(childs[childs.length-1]){
                            const itemEle = childs[childs.length-1]
                            itemEle.querySelector(`#enabled`).checked = enabled
                            itemEle.querySelector(`#name`).value = name
                            itemEle.querySelector(`#chatId`).value = chat_id
                        }
                    }
                }
            }

        }

        formEle.onsubmit = (e)=>{
            e.preventDefault()
            const emailItemsEle = formEle.querySelector(`#emailItemsEle`)
            const tgItemsEle = formEle.querySelector(`#tgItemsEle`)
            const lineItemsEle = formEle.querySelector(`#lineItemsEle`)
            const telItemsEle = formEle.querySelector(`#telItemsEle`)
            const tboardItemsEle = formEle.querySelector(`#tboardItemsEle`)

            const emailItems = [...emailItemsEle.children]
            const tgItems = [...tgItemsEle.children]
            const lineItems = [...lineItemsEle.children]
            const telItems = [...telItemsEle.children]
            const tboardItems = [...tboardItemsEle.children]

            let room_id = []
            let email = []
            let tel = []
            let chat_id = []
            let tboard = []

            for (const itemEle of emailItems) {
                const item_id = parseInt(itemEle.dataset.item_id)
                const enabledEle = itemEle.querySelector(`#enabled`)
                const emailEle = itemEle.querySelector(`#email`)
                const nameEle = itemEle.querySelector(`#name`)
                email.push({
                    item_id,
                    enabled: enabledEle.checked?1:0,
                    name: nameEle.value,
                    email: emailEle.value
                })
            }
            for (const itemEle of tgItems) {
                const item_id = parseInt(itemEle.dataset.item_id)
                const enabledEle = itemEle.querySelector(`#enabled`)
                const chatIdEle = itemEle.querySelector(`#chatId`)
                const nameEle = itemEle.querySelector(`#name`)
                chat_id.push({
                    item_id,
                    enabled: enabledEle.checked?1:0,
                    name: nameEle.value,
                    chat_id: chatIdEle.value
                })
            }
            for (const itemEle of lineItems) {
                const item_id = parseInt(itemEle.dataset.item_id)
                const enabledEle = itemEle.querySelector(`#enabled`)
                const chatIdEle = itemEle.querySelector(`#chatId`)
                const nameEle = itemEle.querySelector(`#name`)
                room_id.push({
                    item_id,
                    enabled: enabledEle.checked?1:0,
                    name: nameEle.value,
                    room_id: chatIdEle.value
                })
            }
            for (const itemEle of telItems) {
                const item_id = parseInt(itemEle.dataset.item_id)
                const enabledEle = itemEle.querySelector(`#enabled`)
                const telEle = itemEle.querySelector(`#tel`)
                const nameEle = itemEle.querySelector(`#name`)
                tel.push({
                    item_id,
                    enabled: enabledEle.checked?1:0,
                    name: nameEle.value,
                    telnumber: telEle.value
                })
            }
            for (const itemEle of tboardItems) {
                const item_id = parseInt(itemEle.dataset.item_id)
                const enabledEle = itemEle.querySelector(`#enabled`)
                const clientIdEle = itemEle.querySelector(`#clientId`)
                const nameEle = itemEle.querySelector(`#name`)
                const passwordEle = itemEle.querySelector(`#password`)
                tboard.push({
                    item_id,
                    enabled: enabledEle.checked?1:0,
                    name: nameEle.value,
                    client_id: clientIdEle.value,
                    auth: btoa(`admin:${passwordEle.value}`)
                })
            }

            let updateData = {
                line: [],
                linemessaging: {
                    access_token: lineAccessTokenInput.value,
                    room_id
                },
                email,
                tel,
                telegram: {
                    bot_token: tgBotTokenInput.value,
                    chat_id
                },
                tboard
            }
            
            UPDATEDATA.addItem(MAC, "contacts", updateData)
            tab_contacts.dispatchEvent( new Event("click") )
        }
        
        LOADING.hide()
    }

    function addEmail(id){
        let new_id = new Date().getTime()
        new_id = Math.floor(new_id/1000)
        id = typeof id == "object"?new_id:id
        id = typeof id == "number"?id:new_id
        const formEle = dataArea.querySelector("form")
        const emailItemsEle = formEle.querySelector(`#emailItemsEle`)
        const itemsAll = [...emailItemsEle.children]  
        if(itemsAll.length >= MAX_ITEMS["contact"]){ alert("จำนวนครบ "+ MAX_ITEMS["contact"] +" แล้ว"); return}
        if(itemsAll.filter(x=>x.dataset.item_id === String(id)).length > 0){ return }
        const itemEle = document.createElement("div")
        itemEle.className = "form-group-v border-basic"
        itemEle.dataset.item_id = id

        const buttonsGroup = document.createElement("div")
        buttonsGroup.className = "form-group-h form-group-wrap"
        const deleteBtn = document.createElement("button")
        deleteBtn.type = "button"
        deleteBtn.className = "bg-red"
        deleteBtn.textContent = "ลบ"
        deleteBtn.onclick = ()=>{
            itemEle.remove()
        }
        const itemIdLabel = document.createElement("label")
        itemIdLabel.textContent = `item_id : ${id}`
        buttonsGroup.appendChild(deleteBtn)
        buttonsGroup.appendChild(itemIdLabel)

        const enableGroup = document.createElement("div")
        enableGroup.className = "form-group-h form-group-wrap"
        const enableLabel = document.createElement("label")
        enableLabel.textContent = "เปิดใช้งาน"
        const enableCheck = document.createElement("input")
        enableCheck.type = "checkbox"
        enableCheck.id = "enabled"
        enableCheck.checked = true
        enableCheck.placeholder = enableLabel.textContent
        enableGroup.appendChild(enableLabel)
        enableGroup.appendChild(enableCheck)

        const nameGroup = document.createElement("div")
        nameGroup.className = "form-group-h form-group-wrap"
        const emailLabel = document.createElement("label")
        emailLabel.textContent = "อีเมล์"
        const emailInput = document.createElement("input")
        emailInput.type = "email"
        emailInput.id = "email"
        emailInput.maxLength = 150
        emailInput.required = true
        emailInput.placeholder = emailLabel.textContent
        const nameLabel = document.createElement("label")
        nameLabel.textContent = "ป้ายชื่อ"
        const nameInput = document.createElement("input")
        nameInput.type = "text"
        nameInput.id = "name"
        nameInput.maxLength = 30
        nameInput.required = true
        nameInput.placeholder = nameLabel.textContent
        nameGroup.appendChild(nameLabel)
        nameGroup.appendChild(nameInput)
        nameGroup.appendChild(emailLabel)
        nameGroup.appendChild(emailInput)

        itemEle.appendChild(buttonsGroup)
        itemEle.appendChild(enableGroup)
        itemEle.appendChild(nameGroup)

        emailItemsEle.appendChild(itemEle)
    }
    function addTgChat(id){
        let new_id = new Date().getTime()
        new_id = Math.floor(new_id/1000)
        id = typeof id == "object"?new_id:id
        id = typeof id == "number"?id:new_id
        const formEle = dataArea.querySelector("form")
        const tgItemsEle = formEle.querySelector(`#tgItemsEle`)
        const itemsAll = [...tgItemsEle.children]  
        if(itemsAll.length >= MAX_ITEMS["contact"]){ alert("จำนวนครบ "+ MAX_ITEMS["contact"] +" แล้ว"); return}
        if(itemsAll.filter(x=>x.dataset.item_id === String(id)).length > 0){ return }
        const itemEle = document.createElement("div")
        itemEle.className = "form-group-v border-basic"
        itemEle.dataset.item_id = id

        const buttonsGroup = document.createElement("div")
        buttonsGroup.className = "form-group-h form-group-wrap"
        const deleteBtn = document.createElement("button")
        deleteBtn.type = "button"
        deleteBtn.className = "bg-red"
        deleteBtn.textContent = "ลบ"
        deleteBtn.onclick = ()=>{
            itemEle.remove()
        }
        const itemIdLabel = document.createElement("label")
        itemIdLabel.textContent = `item_id : ${id}`
        buttonsGroup.appendChild(deleteBtn)
        buttonsGroup.appendChild(itemIdLabel)

        const enableGroup = document.createElement("div")
        enableGroup.className = "form-group-h form-group-wrap"
        const enableLabel = document.createElement("label")
        enableLabel.textContent = "เปิดใช้งาน"
        const enableCheck = document.createElement("input")
        enableCheck.type = "checkbox"
        enableCheck.id = "enabled"
        enableCheck.checked = true
        enableCheck.placeholder = enableLabel.textContent
        enableGroup.appendChild(enableLabel)
        enableGroup.appendChild(enableCheck)

        const nameGroup = document.createElement("div")
        nameGroup.className = "form-group-h form-group-wrap"
        const chatIdLabel = document.createElement("label")
        chatIdLabel.textContent = "ไอดีห้องแชท"
        const chatIdInput = document.createElement("input")
        chatIdInput.type = "text"
        chatIdInput.id = "chatId"
        chatIdInput.maxLength = 30
        chatIdInput.required = true
        chatIdInput.placeholder = chatIdLabel.textContent
        const nameLabel = document.createElement("label")
        nameLabel.textContent = "ป้ายชื่อ"
        const nameInput = document.createElement("input")
        nameInput.type = "text"
        nameInput.id = "name"
        nameInput.maxLength = 30
        nameInput.required = true
        nameInput.placeholder = nameLabel.textContent
        nameGroup.appendChild(nameLabel)
        nameGroup.appendChild(nameInput)
        nameGroup.appendChild(chatIdLabel)
        nameGroup.appendChild(chatIdInput)

        itemEle.appendChild(buttonsGroup)
        itemEle.appendChild(enableGroup)
        itemEle.appendChild(nameGroup)

        tgItemsEle.appendChild(itemEle)
    }
    function addLineChat(id){
        let new_id = new Date().getTime()
        new_id = Math.floor(new_id/1000)
        id = typeof id == "object"?new_id:id
        id = typeof id == "number"?id:new_id
        const formEle = dataArea.querySelector("form")
        const lineItemsEle = formEle.querySelector(`#lineItemsEle`)
        const itemsAll = [...lineItemsEle.children]  
        if(itemsAll.length >= MAX_ITEMS["contact"]){ alert("จำนวนครบ "+ MAX_ITEMS["contact"] +" แล้ว"); return}
        if(itemsAll.filter(x=>x.dataset.item_id === String(id)).length > 0){ return }
        const itemEle = document.createElement("div")
        itemEle.className = "form-group-v border-basic"
        itemEle.dataset.item_id = id

        const buttonsGroup = document.createElement("div")
        buttonsGroup.className = "form-group-h form-group-wrap"
        const deleteBtn = document.createElement("button")
        deleteBtn.type = "button"
        deleteBtn.className = "bg-red"
        deleteBtn.textContent = "ลบ"
        deleteBtn.onclick = ()=>{
            itemEle.remove()
        }
        const itemIdLabel = document.createElement("label")
        itemIdLabel.textContent = `item_id : ${id}`
        buttonsGroup.appendChild(deleteBtn)
        buttonsGroup.appendChild(itemIdLabel)

        const enableGroup = document.createElement("div")
        enableGroup.className = "form-group-h form-group-wrap"
        const enableLabel = document.createElement("label")
        enableLabel.textContent = "เปิดใช้งาน"
        const enableCheck = document.createElement("input")
        enableCheck.type = "checkbox"
        enableCheck.id = "enabled"
        enableCheck.checked = true
        enableCheck.placeholder = enableLabel.textContent
        enableGroup.appendChild(enableLabel)
        enableGroup.appendChild(enableCheck)

        const nameGroup = document.createElement("div")
        nameGroup.className = "form-group-h form-group-wrap"
        const chatIdLabel = document.createElement("label")
        chatIdLabel.textContent = "ไอดีห้องแชท"
        const chatIdInput = document.createElement("input")
        chatIdInput.type = "text"
        chatIdInput.id = "chatId"
        chatIdInput.maxLength = 30
        chatIdInput.required = true
        chatIdInput.placeholder = chatIdLabel.textContent
        const nameLabel = document.createElement("label")
        nameLabel.textContent = "ป้ายชื่อ"
        const nameInput = document.createElement("input")
        nameInput.type = "text"
        nameInput.id = "name"
        nameInput.maxLength = 30
        nameInput.required = true
        nameInput.placeholder = nameLabel.textContent
        nameGroup.appendChild(nameLabel)
        nameGroup.appendChild(nameInput)
        nameGroup.appendChild(chatIdLabel)
        nameGroup.appendChild(chatIdInput)

        itemEle.appendChild(buttonsGroup)
        itemEle.appendChild(enableGroup)
        itemEle.appendChild(nameGroup)

        lineItemsEle.appendChild(itemEle)
    }
    function addTelNumber(id){
        let new_id = new Date().getTime()
        new_id = Math.floor(new_id/1000)
        id = typeof id == "object"?new_id:id
        id = typeof id == "number"?id:new_id
        const formEle = dataArea.querySelector("form")
        const telItemsEle = formEle.querySelector(`#telItemsEle`)
        const itemsAll = [...telItemsEle.children]  
        if(itemsAll.length >= MAX_ITEMS["contact"]){ alert("จำนวนครบ "+ MAX_ITEMS["contact"] +" แล้ว"); return}
        if(itemsAll.filter(x=>x.dataset.item_id === String(id)).length > 0){ return }
        const itemEle = document.createElement("div")
        itemEle.className = "form-group-v border-basic"
        itemEle.dataset.item_id = id

        const buttonsGroup = document.createElement("div")
        buttonsGroup.className = "form-group-h form-group-wrap"
        const deleteBtn = document.createElement("button")
        deleteBtn.type = "button"
        deleteBtn.className = "bg-red"
        deleteBtn.textContent = "ลบ"
        deleteBtn.onclick = ()=>{
            itemEle.remove()
        }
        const itemIdLabel = document.createElement("label")
        itemIdLabel.textContent = `item_id : ${id}`
        buttonsGroup.appendChild(deleteBtn)
        buttonsGroup.appendChild(itemIdLabel)

        const enableGroup = document.createElement("div")
        enableGroup.className = "form-group-h form-group-wrap"
        const enableLabel = document.createElement("label")
        enableLabel.textContent = "เปิดใช้งาน"
        const enableCheck = document.createElement("input")
        enableCheck.type = "checkbox"
        enableCheck.id = "enabled"
        enableCheck.checked = true
        enableCheck.placeholder = enableLabel.textContent
        enableGroup.appendChild(enableLabel)
        enableGroup.appendChild(enableCheck)

        const nameGroup = document.createElement("div")
        nameGroup.className = "form-group-h form-group-wrap"
        const telLabel = document.createElement("label")
        telLabel.textContent = "เบอร์โทร"
        const telInput = document.createElement("input")
        telInput.type = "text"
        telInput.id = "tel"
        telInput.maxLength = 12
        telInput.required = true
        telInput.placeholder = telLabel.textContent
        const nameLabel = document.createElement("label")
        nameLabel.textContent = "ป้ายชื่อ"
        const nameInput = document.createElement("input")
        nameInput.type = "text"
        nameInput.id = "name"
        nameInput.maxLength = 30
        nameInput.required = true
        nameInput.placeholder = nameLabel.textContent
        nameGroup.appendChild(nameLabel)
        nameGroup.appendChild(nameInput)
        nameGroup.appendChild(telLabel)
        nameGroup.appendChild(telInput)

        itemEle.appendChild(buttonsGroup)
        itemEle.appendChild(enableGroup)
        itemEle.appendChild(nameGroup)

        telItemsEle.appendChild(itemEle)
    }
    function addTBoardClient(id){
        let new_id = new Date().getTime()
        new_id = Math.floor(new_id/1000)
        id = typeof id == "object"?new_id:id
        id = typeof id == "number"?id:new_id
        const formEle = dataArea.querySelector("form")
        const tboardItemsEle = formEle.querySelector(`#tboardItemsEle`)
        const itemsAll = [...tboardItemsEle.children]  
        if(itemsAll.length >= MAX_ITEMS["contact"]){ alert("จำนวนครบ "+ MAX_ITEMS["contact"] +" แล้ว"); return}
        if(itemsAll.filter(x=>x.dataset.item_id === String(id)).length > 0){ return }
        const itemEle = document.createElement("div")
        itemEle.className = "form-group-v border-basic"
        itemEle.dataset.item_id = id

        const buttonsGroup = document.createElement("div")
        buttonsGroup.className = "form-group-h form-group-wrap"
        const deleteBtn = document.createElement("button")
        deleteBtn.type = "button"
        deleteBtn.className = "bg-red"
        deleteBtn.textContent = "ลบ"
        deleteBtn.onclick = ()=>{
            itemEle.remove()
        }
        const itemIdLabel = document.createElement("label")
        itemIdLabel.textContent = `item_id : ${id}`
        buttonsGroup.appendChild(deleteBtn)
        buttonsGroup.appendChild(itemIdLabel)

        const enableGroup = document.createElement("div")
        enableGroup.className = "form-group-h form-group-wrap"
        const enableLabel = document.createElement("label")
        enableLabel.textContent = "เปิดใช้งาน"
        const enableCheck = document.createElement("input")
        enableCheck.type = "checkbox"
        enableCheck.id = "enabled"
        enableCheck.checked = true
        enableCheck.placeholder = enableLabel.textContent
        enableGroup.appendChild(enableLabel)
        enableGroup.appendChild(enableCheck)

        const nameGroup = document.createElement("div")
        nameGroup.className = "form-group-h form-group-wrap"
        const clientIdLabel = document.createElement("label")
        clientIdLabel.textContent = "Client ID"
        const clientIdInput = document.createElement("input")
        clientIdInput.type = "text"
        clientIdInput.id = "clientId"
        clientIdInput.required = true
        clientIdInput.placeholder = clientIdLabel.textContent
        const nameLabel = document.createElement("label")
        nameLabel.textContent = "ป้ายชื่อ"
        const nameInput = document.createElement("input")
        nameInput.type = "text"
        nameInput.id = "name"
        nameInput.maxLength = 30
        nameInput.required = true
        nameInput.placeholder = nameLabel.textContent
        const passwordLabel = document.createElement("label")
        passwordLabel.textContent = "รหัสผ่าน"
        const passwordInput = document.createElement("input")
        passwordInput.type = "password"
        passwordInput.id = "password"
        passwordInput.placeholder = passwordLabel.textContent
        nameGroup.appendChild(nameLabel)
        nameGroup.appendChild(nameInput)
        nameGroup.appendChild(clientIdLabel)
        nameGroup.appendChild(clientIdInput)
        nameGroup.appendChild(passwordLabel)
        nameGroup.appendChild(passwordInput)

        itemEle.appendChild(buttonsGroup)
        itemEle.appendChild(enableGroup)
        itemEle.appendChild(nameGroup)

        tboardItemsEle.appendChild(itemEle)
    }

    /****************/
    async function displayExtraCmdList() {

        let nwData = null
        let mqttData = null
        let outputs = []
        let modWrites = []
        let dataSlots = []

        if(UPDATEDATA.findItem(MAC, "network")){
            const storageData = UPDATEDATA.findItem(MAC, "network")
            nwData = storageData.data
        }else{
            nwData = await getNw()
        }

        if(UPDATEDATA.findItem(MAC, "mqtt")){
            const storageData = UPDATEDATA.findItem(MAC, "mqtt")
            mqttData = storageData.data
        }else{
            mqttData = await getMqttCfg()
        }

        if(UPDATEDATA.findItem(MAC, "outputs")){
            const storageData = UPDATEDATA.findItem(MAC, "outputs")
            outputs = storageData.data
        }else{
            outputs = await getOutputs()
        }

        if(UPDATEDATA.findItem(MAC, "modbusWrite")){
            const storageData = UPDATEDATA.findItem(MAC, "modbusWrite")
            modWrites = storageData.data
        }else{
            modWrites = await getModbusWrite()
        }

        if(UPDATEDATA.findItem(MAC, "dataslots")){
            const storageData = UPDATEDATA.findItem(MAC, "dataslots")
            dataSlots = storageData.data
        }else{
            dataSlots = await getDataslots()  
        }        

        const ipAddress = nwData.info.local.ipaddress
        const basetopic = mqttData.basetopic
        const client_id = mqttData.mqtt_client
        
        const mqttTopicEle = document.createElement("div")
        mqttTopicEle.className = "form-group-h"
        mqttTopicEle.style.width = "100%"
        const httpPostUrlEle = document.createElement("div")
        httpPostUrlEle.className = "form-group-h"
        httpPostUrlEle.style.width = "100%"
        const tboardPasswordEle = document.createElement("div")
        tboardPasswordEle.className = "form-group-h"
        ctrlGroup.appendChild(mqttTopicEle)
        ctrlGroup.appendChild(httpPostUrlEle)
        ctrlGroup.appendChild(tboardPasswordEle)
        mqttTopicEle.innerHTML = `
        <strong>สำหรับ MQTT TOPIC :</strong>
        <input type="text" readonly value="${basetopic}/${client_id}/subextra"
        style="flex-grow:1;" />
        `
        httpPostUrlEle.innerHTML = `
        <strong>สำหรับ HTTP POST : </strong>
        <input type="text" readonly value="http://${ipAddress}/extra_action"
        style="flex-grow:1;" />
        `
        const defaultPass="admin"
        const tboardPasswordLabel = document.createElement("label")
        tboardPasswordLabel.textContent = `รหัสผ่านบอร์ด`
        const tboardPasswordInput = document.createElement("input")
        tboardPasswordInput.type = `password`
        tboardPasswordInput.id = `tboardPassword`
        tboardPasswordInput.placeholder = tboardPasswordLabel.textContent
        tboardPasswordInput.value = defaultPass
        tboardPasswordEle.appendChild(tboardPasswordLabel)
        tboardPasswordEle.appendChild(tboardPasswordInput)

        /***************************/
        const outputsPayloadGroup = document.createElement("div")
        outputsPayloadGroup.id = `outputsPayloadGroup`
        outputsPayloadGroup.className = `form-group-h border-basic`
        outputsPayloadGroup.style.marginBottom = `.5rem`

        const outputItemsGroup = document.createElement("div")
        outputItemsGroup.id = `outputItemsGroup`
        outputItemsGroup.className = `form-group-v`
        outputItemsGroup.innerHTML = `<h3>สั่งงานเอาท์พุต</h3>`

        const outputPayloadGroup = document.createElement("div")
        outputPayloadGroup.id = `outputPayloadGroup`
        outputPayloadGroup.className = `form-group-v border-basic`
        outputPayloadGroup.style.flexGrow = 1
        outputPayloadGroup.innerHTML = `<h3>ตัวอย่าง Payload</h3>`

        const outputPayloadTextArea = document.createElement("textarea")
        outputPayloadTextArea.id = `outputPayloadTextArea`
        outputPayloadTextArea.rows = 8
        outputPayloadTextArea.readOnly = true
        const updateOutputPayload = document.createElement("button")
        updateOutputPayload.id = "updateOutputPayload"
        updateOutputPayload.className = "bg-yellow"
        updateOutputPayload.style.marginRight = "auto"
        updateOutputPayload.type = "button"
        updateOutputPayload.textContent = "อัพเดท Payload"
        outputPayloadGroup.appendChild(updateOutputPayload)
        outputPayloadGroup.appendChild(outputPayloadTextArea)

        outputsPayloadGroup.appendChild(outputItemsGroup)
        outputsPayloadGroup.appendChild(outputPayloadGroup)

        updateOutputPayload.onclick = ()=>{
            const childrens = Array.from(outputItemsGroup.querySelectorAll(`#outputItemEle`))
            let cmd = []
            for (const x of childrens) {
                const itemCheck = x.querySelector(`#itemCheck`)
                const delaysInput = x.querySelector(`#delaysInput`)
                const stateSelect = x.querySelector(`#stateSelect`)
                const index = parseInt(itemCheck.dataset.output)
                if(itemCheck.checked)
                {
                    cmd.push({
                        index,
                        delay:parseInt(delaysInput.value),
                        value:stateSelect.value
                    })
                }
            }
            let json = {
                "subject": "outputs",
                cmd,
                "auth": btoa(`admin:${tboardPasswordInput.value}`)
            }
            outputPayloadTextArea.value = JSON.stringify(json, null, 2)
            setTimeout(()=>{ copyTextValueByInputElement(outputPayloadTextArea) },500)
        }

        outputs.map((x,xi)=>{

            const itemLabel = document.createElement("label")
            itemLabel.textContent = x.name
            const itemCheck = document.createElement("input")
            itemCheck.type = "checkbox"
            itemCheck.id = "itemCheck"
            itemCheck.dataset.output = xi
            const itemGroup = document.createElement("div")
            itemGroup.className = "form-group-h"
            itemGroup.appendChild(itemCheck)
            itemGroup.appendChild(itemLabel)
            
            const delaysInput = document.createElement("input")
            delaysInput.id = "delaysInput"
            delaysInput.type = "number"
            delaysInput.required = true
            delaysInput.min = 0
            delaysInput.value = 0
            delaysInput.style.minWidth = 'auto'
            const delaysLabel = document.createElement("label")
            delaysLabel.textContent = "ดีเลย์ก่อน (วินาที)"
            const delaysGroup = document.createElement("div")
            delaysGroup.className = "form-group-h"
            delaysGroup.appendChild(delaysLabel)
            delaysGroup.appendChild(delaysInput)
            
            const stateSelect = document.createElement("select")
            stateSelect.id = "stateSelect"
            stateSelect.required = true
            stateSelect.style.minWidth = 'auto'
            stateSelect.innerHTML = `<option value="off">OFF</option>
            <option value="on">ON</option>
            <option value="toggle">TOGGLE</option>
            `
            const stateLabel = document.createElement("label")
            stateLabel.textContent = "สถานะ"
            const stateGroup = document.createElement("div")
            stateGroup.className = "form-group-h"
            stateGroup.appendChild(stateLabel)
            stateGroup.appendChild(stateSelect)

            const outputItemEle = document.createElement("div")
            outputItemEle.id = `outputItemEle`
            outputItemEle.className = `form-group-h`
            outputItemEle.appendChild(itemGroup)
            outputItemEle.appendChild(delaysGroup)
            outputItemEle.appendChild(stateGroup)

            outputItemsGroup.appendChild(outputItemEle)
        })
        updateOutputPayload.dispatchEvent( new Event("click") )
        /***************************/
        const modWritesPayloadGroup = document.createElement("div")
        modWritesPayloadGroup.id = `modWritesPayloadGroup`
        modWritesPayloadGroup.className = `form-group-h border-basic`
        modWritesPayloadGroup.style.marginBottom = `.5rem`

        const modWriteFormGroup = document.createElement("div")
        modWriteFormGroup.id = `modWriteFormGroup`
        modWriteFormGroup.className = `form-group-v`
        modWriteFormGroup.innerHTML = `<h3>สั่งงาน ปรับค่าในช่องเก็บข้อมูล</h3>`

        const modWritePayloadGroup = document.createElement("div")
        modWritePayloadGroup.id = `modWriteloadGroup`
        modWritePayloadGroup.className = `form-group-v border-basic`
        modWritePayloadGroup.style.flexGrow = 1

        const modbusWritePayloadLabel1 = document.createElement("h3")
        modbusWritePayloadLabel1.textContent = "ไอเทม CMD"
        const modbusWritePayloadLabel2 = document.createElement("h3")
        modbusWritePayloadLabel2.textContent = "ตัวอย่าง Payload"

        const modWriteCmdPayloadTextArea = document.createElement("textarea")
        modWriteCmdPayloadTextArea.id = `madWriteCmdPayloadTextArea`
        modWriteCmdPayloadTextArea.rows = 8
        modWriteCmdPayloadTextArea.readOnly = true        
        const modWritePayloadTextArea = document.createElement("textarea")
        modWritePayloadTextArea.id = `modWritePayloadTextArea`
        modWritePayloadTextArea.rows = 8
        modWritePayloadTextArea.readOnly = true

        const updateModWritePayload = document.createElement("button")
        updateModWritePayload.id = "updateModWritePayload"
        updateModWritePayload.className = "bg-yellow"
        updateModWritePayload.style.marginRight = "auto"
        updateModWritePayload.type = "button"
        updateModWritePayload.textContent = "อัพเดท CMD & Payload"

        modWritePayloadGroup.appendChild(updateModWritePayload)
        modWritePayloadGroup.appendChild(modbusWritePayloadLabel1)
        modWritePayloadGroup.appendChild(modWriteCmdPayloadTextArea)
        modWritePayloadGroup.appendChild(modbusWritePayloadLabel2)
        modWritePayloadGroup.appendChild(modWritePayloadTextArea)

        modWritesPayloadGroup.appendChild(modWriteFormGroup)
        modWritesPayloadGroup.appendChild(modWritePayloadGroup)

        /*---------*/
        const modbusWriteSelect = document.createElement("select")
        modbusWriteSelect.id = "destinationSelect"
        modbusWriteSelect.required = true
        modbusWriteSelect.style.minWidth = 'auto'
        const modbusWriteLabel = document.createElement("label")
        modbusWriteLabel.textContent = "สถานะ"
        const modbusWriteGroup = document.createElement("div")
        modbusWriteGroup.className = "form-group-h"
        modbusWriteGroup.appendChild(modbusWriteLabel)
        modbusWriteGroup.appendChild(modbusWriteSelect)

        const addressInput = document.createElement("input")
        addressInput.id = "addressInput"
        addressInput.type = "number"
        addressInput.required = true
        addressInput.value = 0
        const addressLabel = document.createElement("label")
        addressLabel.textContent = "รีจิสเตอร์"
        const addressGroup = document.createElement("div")
        addressGroup.className = "form-group-h"
        addressGroup.appendChild(addressLabel)
        addressGroup.appendChild(addressInput)

        const qtyInput = document.createElement("input")
        qtyInput.id = "qtyInput"
        qtyInput.type = "number"
        qtyInput.required = true
        qtyInput.min = 0
        qtyInput.value = 1
        const qtyLabel = document.createElement("label")
        qtyLabel.textContent = "จำนวน"
        const qtyGroup = document.createElement("div")
        qtyGroup.className = "form-group-h"
        qtyGroup.appendChild(qtyLabel)
        qtyGroup.appendChild(qtyInput)

        const delaysInput = document.createElement("input")
        delaysInput.id = "delaysInput"
        delaysInput.type = "number"
        delaysInput.required = true
        delaysInput.min = 0
        delaysInput.value = 0
        delaysInput.style.minWidth = 'auto'
        const delaysLabel = document.createElement("label")
        delaysLabel.textContent = "ดีเลย์ก่อน (วินาที)"
        const delaysGroup = document.createElement("div")
        delaysGroup.className = "form-group-h"
        delaysGroup.appendChild(delaysLabel)
        delaysGroup.appendChild(delaysInput)

        const valueItems = document.createElement("div")
        valueItems.id = `valueItems`
        valueItems.className = "form-group-h form-group-wrap"

        modWriteFormGroup.appendChild(modbusWriteGroup)
        modWriteFormGroup.appendChild(addressGroup)
        modWriteFormGroup.appendChild(qtyGroup)
        modWriteFormGroup.appendChild(delaysGroup)
        modWriteFormGroup.appendChild(valueItems)

        updateModWritePayload.onclick = ()=>{
            const payloadJsonStr  = `{
    "subject":"modbus_w",
    "auth":"${btoa(`admin:${tboardPasswordInput.value}`)}",
    "cmd":[{itemA},{itemB},{itemC}]
}`
            modWritePayloadTextArea.value = payloadJsonStr
            if(modbusWriteSelect.value==""){
                modWriteCmdPayloadTextArea.value = ""
            }else{
                const selected = modbusWriteSelect.options[modbusWriteSelect.options.selectedIndex]
                let list = []
                const valueItemsAll = [...valueItems.children]
                for (const el of valueItemsAll) {
                    const fc = parseInt(selected.dataset.fc)
                    const address = parseInt(el.dataset.address)
                    const customValueEle = el.querySelector(`#valueInput`)
                    if(selected.dataset.data_type=="numberic"){
                        const value = isNaN(parseFloat(customValueEle.value))?0:parseFloat(customValueEle.value)
                        const calcItemsEle = el.querySelector(`#calcItems`)
                        const cal = getCalcItems(calcItemsEle)                        
                        if(fc==16)
                        {
                            const valueTypeSelectEle = el.querySelector(`#valueTypeSelect`)
                            const valueFormatSelectEle = el.querySelector(`#valueFormatSelect`)
                            if(!valueTypeSelectEle.disabled){
                                list.push({
                                    value,
                                    value_type:valueTypeSelectEle.value,
                                    value_format:valueFormatSelectEle.value,
                                    cal
                                })
                            }
                        }else{
                            list.push({
                                value,
                                cal
                            })
                        }
                    }
                    if(selected.dataset.data_type=="state"){
                        const customStateEle = el.querySelector(`#valueStateSelect`)
                        list.push({
                            value:customStateEle.value
                        })
                    }
                }
                let cmd = {
                    "item_id": parseInt(modbusWriteSelect.value),
                    "delay": parseInt(delaysInput.value),
                    "send": {
                        "type": selected.dataset.data_type,
                        "address": parseInt(addressInput.value),
                        list,
                        "qty": valueItemsAll.length
                    }
                }
                modWriteCmdPayloadTextArea.value = JSON.stringify(cmd,null,2)
            }

        }

        modWrites.map(x=>{
            const option = document.createElement("option")
            option.value = x.item_id
            option.textContent = x.name
            option.dataset.data_type = x.data_type
            option.dataset.fc = x.fc
            modbusWriteSelect.appendChild(option)
        })

        const valueFromVariableSelect = document.createElement("select")
        valueFromVariableSelect.id = "valueFromVariableSelect"
        const valueFromVariableLabel = document.createElement("label")
        valueFromVariableLabel.textContent = "ค่าจากตัวแปร/ข้อมูล"
        const valueFromVariableGroup = document.createElement("div")
        valueFromVariableGroup.className = "form-group-h"
        valueFromVariableGroup.appendChild(valueFromVariableLabel)
        valueFromVariableGroup.appendChild(valueFromVariableSelect)

        const valueStateSelect = document.createElement("select")
        valueStateSelect.id = "valueStateSelect"
        const valueStateLabel = document.createElement("label")
        valueStateLabel.textContent = "สถานะ"
        const valueStateGroup = document.createElement("div")
        valueStateGroup.className = "form-group-h"
        valueStateGroup.appendChild(valueStateLabel)
        valueStateGroup.appendChild(valueStateSelect)

        const valueInput = document.createElement("input")
        valueInput.id = "valueInput"
        valueInput.type = "number"
        valueInput.step = "any"
        valueInput.required = true
        const valueLabel = document.createElement("label")
        valueLabel.textContent = "ค่า"
        const valueGroup = document.createElement("div")
        valueGroup.className = "form-group-h"
        valueGroup.appendChild(valueLabel)
        valueGroup.appendChild(valueInput)

        const valueFromSelect = document.createElement("select")
        valueFromSelect.id = "valueFromSelect"
        valueFromSelect.innerHTML = `<option value="custom">กำหนดเอง</option>
        <option value="var">ตัวแปร/ข้อมูลอื่น</option>`
        const valueFromLabel = document.createElement("label")
        valueFromLabel.textContent = "ค่าที่ส่ง"
        const valueFromGroup = document.createElement("div")
        valueFromGroup.className = "form-group-h"
        valueFromGroup.appendChild(valueFromLabel)
        valueFromGroup.appendChild(valueFromSelect)

        modbusWriteSelect.onchange = ()=>{
            if(modbusWriteSelect.value==""){ return }
            const selected = modbusWriteSelect.options[modbusWriteSelect.options.selectedIndex]
            const fc = parseInt(selected.dataset.fc)
            if([15,16].includes(fc)){
                qtyInput.disabled = false
                qtyGroup.style.display = "flex"
                qtyInput.value = 0
            }else{
                qtyInput.disabled = true
                qtyGroup.style.display = "none"
                qtyInput.value = 1
            }
            qtyInput.dispatchEvent( new Event("change") )
        }

        addressInput.onchange = ()=>{
            appendItems(modWriteFormGroup, { valueFromGroup,
                valueGroup,
                valueStateGroup,
                valueFromVariableGroup }, false )
        }
        qtyInput.onchange = ()=>{
            appendItems(modWriteFormGroup, { valueFromGroup,
                valueGroup,
                valueStateGroup,
                valueFromVariableGroup }, false )
        }
        modbusWriteSelect.dispatchEvent( new Event("change") )
        updateModWritePayload.dispatchEvent( new Event("click") )

        /***************************/
        const dataslotsPayloadGroup = document.createElement("div")
        dataslotsPayloadGroup.id = `dataslotsPayloadGroup`
        dataslotsPayloadGroup.className = `form-group-h border-basic`
        dataslotsPayloadGroup.style.marginBottom = `.5rem`

        const dataslotItemsGroup = document.createElement("div")
        dataslotItemsGroup.id = `dataslotItemsGroup`
        dataslotItemsGroup.className = `form-group-v`
        dataslotItemsGroup.innerHTML = `<h3>สั่งงาน ปรับค่าในช่องเก็บข้อมูล</h3>`

        const dataslotPayloadGroup = document.createElement("div")
        dataslotPayloadGroup.id = `inputPayloadGroup`
        dataslotPayloadGroup.className = `form-group-v border-basic`
        dataslotPayloadGroup.style.flexGrow = 1
        dataslotPayloadGroup.innerHTML = `<h3>ตัวอย่าง Payload</h3>`

        const updateDataslotsPayload = document.createElement("button")
        updateDataslotsPayload.id = "updateDataslotsPayload"
        updateDataslotsPayload.className = "bg-yellow"
        updateDataslotsPayload.style.marginRight = "auto"
        updateDataslotsPayload.type = "button"
        updateDataslotsPayload.textContent = "อัพเดท Payload"

        const dataslotPayloadTextArea = document.createElement("textarea")
        dataslotPayloadTextArea.id = `dataslotPayloadTextArea`
        dataslotPayloadTextArea.rows = 8
        dataslotPayloadTextArea.readOnly = true
        dataslotPayloadGroup.appendChild(updateDataslotsPayload)
        dataslotPayloadGroup.appendChild(dataslotPayloadTextArea)

        dataslotsPayloadGroup.appendChild(dataslotItemsGroup)
        dataslotsPayloadGroup.appendChild(dataslotPayloadGroup)

        updateDataslotsPayload.onclick = ()=>{
            const childrens = Array.from(dataslotItemsGroup.querySelectorAll(`#dataslotItemEle`))
            let cmd = []
            for (const x of childrens) {
                const itemCheck = x.querySelector(`#itemCheck`)
                const valueInput = x.querySelector(`#valueInput`)
                const index = parseInt(itemCheck.dataset.index)
                if(itemCheck.checked)
                {
                    cmd.push({
                        index,
                        value:parseFloat(valueInput.value)
                    })
                }
            }
            let json = {
                "subject": "dataslots",
                cmd,
                "auth": btoa(`admin:${tboardPasswordInput.value}`)
            }
            dataslotPayloadTextArea.value = JSON.stringify(json, null, 2)
            setTimeout(()=>{ copyTextValueByInputElement(dataslotPayloadTextArea) },500)
        }

        dataSlots.map((x,xi)=>{

            const itemLabel = document.createElement("label")
            itemLabel.textContent = `${x.name} ชนิดข้อมูล ${x.type}`
            const itemCheck = document.createElement("input")
            itemCheck.type = "checkbox"
            itemCheck.id = "itemCheck"
            itemCheck.dataset.index = xi
            // itemCheck.checked = true
            const itemGroup = document.createElement("div")
            itemGroup.className = "form-group-h"
            itemGroup.appendChild(itemCheck)
            itemGroup.appendChild(itemLabel)
            
            const valueInput = document.createElement("input")
            valueInput.id = "valueInput"
            valueInput.type = "number"
            valueInput.required = true
            valueInput.step = "any"
            valueInput.value = 0
            valueInput.style.minWidth = 'auto'
            const valueLabel = document.createElement("label")
            valueLabel.textContent = "ส่งข้อมูล"
            const valueGroup = document.createElement("div")
            valueGroup.className = "form-group-h"
            valueGroup.appendChild(valueLabel)
            valueGroup.appendChild(valueInput)

            const dataslotItemEle = document.createElement("div")
            dataslotItemEle.id = `dataslotItemEle`
            dataslotItemEle.className = `form-group-h`
            dataslotItemEle.appendChild(itemGroup)
            dataslotItemEle.appendChild(valueGroup)

            dataslotItemsGroup.appendChild(dataslotItemEle)
        })

        updateDataslotsPayload.dispatchEvent(new Event("click"))
        /***************************/
        dataArea.appendChild(outputsPayloadGroup)
        dataArea.appendChild(modWritesPayloadGroup)
        dataArea.appendChild(dataslotsPayloadGroup)
        /***************************/

        LOADING.hide()
    }
    /****************/

function copyTextValueByInputElement(element)
{
    if(!element){ return }
    element.focus();
    element.select();
    element.setSelectionRange(0, 99999);
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert("คัดลอก Payload เรียบร้อย!");
        }
    } catch (err) {
        console.error("คัดลอกไม่สำเร็จ:", err);
    }
}