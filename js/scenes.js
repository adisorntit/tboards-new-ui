function makeCondition() {
    const itemEle = document.createElement("div")
    itemEle.className = "form-group-v border-basic"

    const deleteBtn = document.createElement("button")
    deleteBtn.type = "button"
    deleteBtn.className = "bg-red"
    deleteBtn.textContent = "ลบ"
    deleteBtn.onclick = ()=>{
        itemEle.remove()
    }

    const cateSelect = document.createElement("select")
    cateSelect.id = "cate"
    cateSelect.innerHTML = `
    <option value="afterboot">อุปกรณ์เริ่มทำงาน</option>
    <option value="input">อินพุต</option>
    <option value="output">เอาท์พุต</option>
    <option value="modbus_read">มอดบัส</option>
    <option value="ping">Ping IP/Domain</option>
    <option value="time">เวลา</option>
    <option value="actionbtn">ปุ่มเสมือน</option>`
    const cateLabel = document.createElement("label")
    cateLabel.textContent = "หมวดหมู่"
    const cateGroup = document.createElement("div")
    cateGroup.className = "form-group-h"
    cateGroup.appendChild(deleteBtn)
    cateGroup.appendChild(cateLabel)
    cateGroup.appendChild(cateSelect)

    const itemDetailsEle = document.createElement("div")
    itemDetailsEle.id = "itemDetailsEle"
    itemDetailsEle.className = "form-group-h form-group-wrap"

    itemEle.appendChild(cateGroup)
    itemEle.appendChild(itemDetailsEle)

    cateSelect.onchange = async ()=>{
        const cate = cateSelect.value
        itemDetailsEle.innerHTML = ``
        const operatorsItems = [
            { value:"eq", name:"เท่ากับ"},
            { value:"ne", name:"ไม่เท่ากับ"},
            { value:"gt", name:"มากกว่า"},
            { value:"ge", name:"มากกว่าหรือเท่ากับ"},
            { value:"lt", name:"น้อยกว่า"},
            { value:"le", name:"น้อยกว่าหรือเท่ากับ"},
            { value:"ch", name:"เปลี่ยนแปลง"},
            { value:"gt-diff-over", name:"มากกว่า และ มีผลต่างตั้งแต่"},
            { value:"gt-diff-in", name:"มากกว่า และ มีผลต่างไม่เกิน"},
            { value:"lt-diff-over", name:"น้อยกว่า และ มีผลต่างตั้งแต่"},
            { value:"lt-diff-in", name:"น้อยกว่า และ มีผลต่างไม่เกิน"},
            // { value:"error", name:"ผิดพลาด"}
        ]
        const operatorSelect = document.createElement("select")
        operatorSelect.id = "operatorSelect"
        const operatorLabel = document.createElement("label")
        operatorLabel.textContent = "" //ตัวเปรียบเทียบ
        const operatorGroup = document.createElement("div")
        operatorGroup.className = "form-group-h"
        operatorGroup.appendChild(operatorLabel)
        operatorGroup.appendChild(operatorSelect)

        const compareWithSelect = document.createElement("select")
        compareWithSelect.id = "compareWithSelect"
        compareWithSelect.innerHTML = `<option value="custom">กำหนดเอง</option>
        <option value="var">ตัวแปร/ข้อมูลอื่น</option>`
        const compareWithLabel = document.createElement("label")
        compareWithLabel.textContent = "ค่าที่เปรียบเทียบ"
        const compareWithGroup = document.createElement("div")
        compareWithGroup.className = "form-group-h"
        compareWithGroup.appendChild(compareWithLabel)
        compareWithGroup.appendChild(compareWithSelect)

        const compareStateSelect = document.createElement("select")
        compareStateSelect.id = "compareStateSelect"
        const compareStateLabel = document.createElement("label")
        compareStateLabel.textContent = "สถานะ"
        const compareStateGroup = document.createElement("div")
        compareStateGroup.className = "form-group-h"
        compareStateGroup.appendChild(compareStateLabel)
        compareStateGroup.appendChild(compareStateSelect)

        const compareValueInput = document.createElement("input")
        compareValueInput.id = "compareValueInput"
        compareValueInput.type = "number"
        compareValueInput.step = "any"
        compareValueInput.required = true
        const compareValueLabel = document.createElement("label")
        compareValueLabel.textContent = "ค่า"
        const compareValueGroup = document.createElement("div")
        compareValueGroup.className = "form-group-h"
        compareValueGroup.appendChild(compareValueLabel)
        compareValueGroup.appendChild(compareValueInput)

        const compareDiffInput = document.createElement("input")
        compareDiffInput.id = "compareDiffInput"
        compareDiffInput.type = "number"
        compareDiffInput.step = "any"
        compareDiffInput.required = true
        const compareDiffLabel = document.createElement("label")
        compareDiffLabel.textContent = "ผลต่าง"
        const compareDiffGroup = document.createElement("div")
        compareDiffGroup.className = "form-group-h"
        compareDiffGroup.appendChild(compareDiffLabel)
        compareDiffGroup.appendChild(compareDiffInput)

        const compareVariableSelect = document.createElement("select")
        compareVariableSelect.id = "compareVariableSelect"
        const compareVariableLabel = document.createElement("label")
        compareVariableLabel.textContent = "เปรียบเทียบกับค่า"
        const compareVariableGroup = document.createElement("div")
        compareVariableGroup.className = "form-group-h"
        compareVariableGroup.appendChild(compareVariableLabel)
        compareVariableGroup.appendChild(compareVariableSelect)
        compareVariableSelect.innerHTML = variables.map(x=>{
            if(x.cate=="input"){
                return `<option value="${x.variable}">อินพุต ${x.name}</option>`
            }else
            if(x.cate=="output"){
                return `<option value="${x.variable}">เอาท์พุต ${x.name}</option>`
            }else
            if(x.cate=="dataslots"){
                return `<option value="${x.variable}">ช่องเก็บข้อมูล ${x.name}</option>`
            }else
            if(x.cate=="modbus"){
                return `<option value="${x.variable}">มอดบัสเซ็นเซอร์ ${x.sensor_name} ค่า ${x.read_name}</option>`
            }else{
                return ""
            }
        }).join("")

        operatorSelect.onchange = ()=>{
            const isHide = ["ch"].includes(operatorSelect.value)
            const isDiff = ["gt-diff-over","gt-diff-in","lt-diff-over","lt-diff-in"].includes(operatorSelect.value)
            compareWithSelect.disabled = isHide
            compareWithGroup.style.display = isHide?"none":"flex"
            compareStateSelect.disabled = isHide
            compareStateGroup.style.display = isHide?"none":"flex"
            compareVariableSelect.disabled = isHide
            compareVariableGroup.style.display = isHide?"none":"flex"
            compareValueInput.disabled = isHide
            compareValueGroup.style.display = isHide?"none":"flex"
            compareDiffInput.disabled = !isDiff
            compareDiffGroup.style.display = isDiff?"flex":"none"
            if(!isHide)
            {
                compareWithSelect.dispatchEvent( new Event("change") )
            }
        }
        
        switch (cate) {
            case "input":
                if(1){
                    const inputSelect = document.createElement("select")
                    inputSelect.id = "inputSelect"
                    inputSelect.required = true
                    inputSelect.innerHTML = inputs.map((x,xi)=>`<option value="${xi}">${x.name}</option>`).join("")
                    const inputLabel = document.createElement("label")
                    inputLabel.textContent = "อินพุต"
                    const inputGroup = document.createElement("div")
                    inputGroup.className = "form-group-h"
                    inputGroup.appendChild(inputLabel)
                    inputGroup.appendChild(inputSelect)
                    operatorSelect.innerHTML = operatorsItems.map(x=>["eq","ne","ch"].includes(x.value)?`<option value="${x.value}">${x.name}</option>`:'').join("")
                    itemDetailsEle.appendChild(inputGroup)
                    itemDetailsEle.appendChild(operatorGroup)
                    itemDetailsEle.appendChild(compareWithGroup)
                    itemDetailsEle.appendChild(compareStateGroup)
                    itemDetailsEle.appendChild(compareVariableGroup)
                    compareStateSelect.innerHTML = `<option value="open">OPEN</option>
                    <option value="close">CLOSE</option>`

                    compareWithSelect.onchange = ()=>{
                        const isCustom = compareWithSelect.value=="custom"
                        compareStateSelect.disabled = !isCustom
                        compareStateGroup.style.display = !isCustom?"none":"flex"
                        compareVariableSelect.disabled = isCustom
                        compareVariableGroup.style.display = isCustom?"none":"flex"
                    }
                    compareWithSelect.dispatchEvent( new Event("change") )
                    operatorSelect.dispatchEvent( new Event("change") )
                }
                break;
            case "output":
                if(1){
                    const outputSelect = document.createElement("select")
                    outputSelect.id = "outputSelect"
                    outputSelect.required = true
                    outputSelect.innerHTML = outputs.map((x,xi)=>`<option value="${xi}">${x.name}</option>`)
                    const outputLabel = document.createElement("label")
                    outputLabel.textContent = "เอาท์พุต"
                    const outputGroup = document.createElement("div")
                    outputGroup.className = "form-group-h"
                    outputGroup.appendChild(outputLabel)
                    outputGroup.appendChild(outputSelect)
                    operatorSelect.innerHTML = operatorsItems.map(x=>["eq","ne","ch"].includes(x.value)?`<option value="${x.value}">${x.name}</option>`:'').join("")
                    itemDetailsEle.appendChild(outputGroup)
                    itemDetailsEle.appendChild(operatorGroup)
                    itemDetailsEle.appendChild(compareWithGroup)
                    itemDetailsEle.appendChild(compareStateGroup)
                    itemDetailsEle.appendChild(compareVariableGroup)
                    compareStateSelect.innerHTML = `<option value="off">OFF</option>
                    <option value="on">ON</option>`
                    
                    compareWithSelect.onchange = ()=>{
                        const isCustom = compareWithSelect.value=="custom"
                        compareStateSelect.disabled = !isCustom
                        compareStateGroup.style.display = !isCustom?"none":"flex"
                        compareVariableSelect.disabled = isCustom
                        compareVariableGroup.style.display = isCustom?"none":"flex"
                    }
                    compareWithSelect.dispatchEvent( new Event("change") )
                    operatorSelect.dispatchEvent( new Event("change") )
                }
                break;
            case "modbus_read":
                console.log(modReads)                
                console.log(modReadTemplates)                
                const modReadSelect = document.createElement("select")
                modReadSelect.id = "modReadSelect"
                modReadSelect.required = true
                modReads.map(x=>{
                    const option = document.createElement("option")
                    option.value = x.item_id
                    option.textContent = x.name
                    option.dataset.template = x.tp_id
                    modReadSelect.appendChild(option)
                })
                const modReadLabel = document.createElement("label")
                modReadLabel.textContent = "เซ็นเซอร์"
                const modReadGroup = document.createElement("div")
                modReadGroup.className = "form-group-h"
                modReadGroup.appendChild(modReadLabel)
                modReadGroup.appendChild(modReadSelect)

                const varSelect = document.createElement("select")
                varSelect.id = "varSelect"
                varSelect.required = true
                const varLabel = document.createElement("label")
                varLabel.textContent = "อ่านค่า"
                const varGroup = document.createElement("div")
                varGroup.className = "form-group-h"
                varGroup.appendChild(varLabel)
                varGroup.appendChild(varSelect)

                modReadSelect.onchange = ()=>{
                    varSelect.innerHTML = ''
                    const optionSelected = modReadSelect.options[modReadSelect.options.selectedIndex]
                    const templateId = parseInt(optionSelected.dataset.template)
                    const tempFiltered = modReadTemplates.filter(x=>x.item_id === templateId)                    
                    if(tempFiltered.length ===1){
                        tempFiltered[0]["read"].map(x=>{
                            const { type, list, replaces } = x
                            list.map(y=>{
                                const option = document.createElement("option")
                                option.value = y.var
                                option.textContent = y.name
                                option.dataset.type = type
                                option.dataset.replaces = JSON.stringify(replaces)
                                varSelect.appendChild(option)
                            })
                        })
                    }
                    varSelect.dispatchEvent( new Event("change") )
                }
                varSelect.onchange = ()=>{
                    const optionSelected = varSelect.options[varSelect.options.selectedIndex]
                    const type = optionSelected.dataset.type
                    const replaces = JSON.parse(optionSelected.dataset.replaces)
                    if(type=="replace"&&replaces&&Array.isArray(replaces)){
                        operatorSelect.innerHTML = operatorsItems.map(x=>["eq","ne","ch"].includes(x.value)?`<option value="${x.value}">${x.name}</option>`:'').join("")
                        compareStateSelect.innerHTML = replaces.map(x=>`<option value="${x.value}">${x.replace}</option>`).join("")
                        operatorSelect.dispatchEvent( new Event("change") )
                    }else{
                        operatorSelect.innerHTML = operatorsItems.map(x=>`<option value="${x.value}">${x.name}</option>`).join("")
                        operatorSelect.dispatchEvent( new Event("change") )
                    }
                }

                compareWithSelect.onchange = ()=>{
                    const isHide = ["ch"].includes(operatorSelect.value)
                    const isCustom = compareWithSelect.value=="custom"
                    const optionSelected = varSelect.options[varSelect.options.selectedIndex]
                    const type = optionSelected.dataset.type
                    const isReplace = type=="replace"
                    if(isCustom&&!isHide)
                    {
                        compareStateSelect.disabled = !isReplace
                        compareStateGroup.style.display = !isReplace?"none":"flex"
                        compareValueInput.disabled = isReplace
                        compareValueGroup.style.display = isReplace?"none":"flex"
                    }else{
                        compareStateSelect.disabled = true
                        compareStateGroup.style.display = "none"
                        compareValueInput.disabled = true
                        compareValueGroup.style.display = "none"
                    }

                    compareVariableSelect.disabled = isCustom
                    compareVariableGroup.style.display = isCustom?"none":"flex"
                }

                itemDetailsEle.appendChild(modReadGroup)
                itemDetailsEle.appendChild(varGroup)
                itemDetailsEle.appendChild(operatorGroup)
                itemDetailsEle.appendChild(compareDiffGroup)
                itemDetailsEle.appendChild(compareWithGroup)
                itemDetailsEle.appendChild(compareVariableGroup)
                itemDetailsEle.appendChild(compareValueGroup)
                itemDetailsEle.appendChild(compareStateGroup)

                modReadSelect.dispatchEvent( new Event("change") )
                compareWithSelect.dispatchEvent( new Event("change") )
                
                break;
            case "ping":
                if(1){
                    const pingSelect = document.createElement("select")
                    pingSelect.id = "pingSelect"
                    pingSelect.required = true
                    pingSelect.innerHTML = pings.map(x=>`<option value="${x.item_id}">${x.name}</option>`).join("")
                    const pingLabel = document.createElement("label")
                    pingLabel.textContent = "Ping"
                    const pingGroup = document.createElement("div")
                    pingGroup.className = "form-group-h"
                    pingGroup.appendChild(pingLabel)
                    pingGroup.appendChild(pingSelect)
                    itemDetailsEle.appendChild(pingGroup)
                    itemDetailsEle.appendChild(compareStateGroup)
                    compareStateSelect.innerHTML = `<option value="1">สำเร็จ</option>
                    <option value="0">ผิดพลาด</option>`
                }
                break;
            case "time":
                const timeInput = document.createElement("input")
                timeInput.id = "timeInput"
                timeInput.required = true
                timeInput.type = "time"
                timeInput.value = "00:00"
                const timeLabel = document.createElement("label")
                timeLabel.textContent = "เมื่อเวลา"
                const timeGroup = document.createElement("div")
                timeGroup.className = "form-group-h"
                timeGroup.appendChild(timeLabel)
                timeGroup.appendChild(timeInput)
                const daysGroup = document.createElement("div")
                daysGroup.className = "form-group-h form-group-wrap"
                dayItems.map((x,xi)=>{
                    const dayLabel = document.createElement("label")
                    dayLabel.textContent = x
                    const dayCheck = document.createElement("input")
                    dayCheck.type = "checkbox"
                    dayCheck.id = `day-${xi}`
                    dayCheck.className = `dayItem`
                    dayCheck.checked = true
                    dayCheck.placeholder = dayLabel.textContent
                    const dayGroup = document.createElement("div")
                    dayGroup.className = "form-group-h form-group-wrap"
                    dayGroup.appendChild(dayLabel)
                    dayGroup.appendChild(dayCheck)
                    daysGroup.appendChild(dayGroup)
                })
                itemDetailsEle.appendChild(timeGroup)
                itemDetailsEle.appendChild(daysGroup)
                break;
            case "actionbtn":
                if(1){
                    const actionBtnSelect = document.createElement("select")
                    actionBtnSelect.id = "actionBtnSelect"
                    actionBtnSelect.required = true
                    actionBtnSelect.innerHTML = actionBtns.map(x=>`<option value="${x.item_id}">${x.name}</option>`).join("")
                    const actionBtnLabel = document.createElement("label")
                    actionBtnLabel.textContent = "ปุ่มเสมือน"
                    const actionBtnGroup = document.createElement("div")
                    actionBtnGroup.className = "form-group-h"
                    const actionBtn2Label = document.createElement("label")
                    actionBtn2Label.textContent = "ทำงาน"
                    actionBtnGroup.appendChild(actionBtnLabel)
                    actionBtnGroup.appendChild(actionBtnSelect)
                    actionBtnGroup.appendChild(actionBtn2Label)
                    itemDetailsEle.appendChild(actionBtnGroup)
                }
                break;
        }
    }

    return itemEle
}

/******************************************* */
function makeAction() {
    const itemEle = document.createElement("div")
    itemEle.className = "form-group-v border-basic"

    const deleteBtn = document.createElement("button")
    deleteBtn.type = "button"
    deleteBtn.className = "bg-red"
    deleteBtn.textContent = "ลบ"
    deleteBtn.onclick = ()=>{
        itemEle.remove()
    }

    const cateSelect = document.createElement("select")
    cateSelect.id = "cate"
    cateSelect.innerHTML = `
    <option value="output">เอาท์พุต</option>
    <option value="modbus_write">สั่งงานมอดบัส</option>
    <option value="linemessaging">ส่งไลน์ Line messaging API</option>
    <option value="telegram">ส่งเทเลแกรม</option>
    <option value="email">ส่งอีเมลล์</option>
    <option value="tel">โทร</option>
    <option value="actionbtn">ทำงานปุ่มเสมือน</option>
    <option value="tboard">TBOARD</option>
    <option value="tboard2">TBOARD (new)</option>`
    const cateLabel = document.createElement("label")
    cateLabel.textContent = "หมวดหมู่"
    const cateGroup = document.createElement("div")
    cateGroup.className = "form-group-h"
    cateGroup.appendChild(deleteBtn)
    cateGroup.appendChild(cateLabel)
    cateGroup.appendChild(cateSelect)

    const itemDetailsEle = document.createElement("div")
    itemDetailsEle.id = "itemDetailsEle"
    itemDetailsEle.className = "form-group-h form-group-wrap"

    itemEle.appendChild(cateGroup)
    itemEle.appendChild(itemDetailsEle)

    /*********************/
    
    cateSelect.onchange = async ()=>{
        const enableLabel = document.createElement("label")
        enableLabel.textContent = "เปิดใช้งาน"
        const enableCheck = document.createElement("input")
        enableCheck.type = "checkbox"
        enableCheck.id = "enabled"
        enableCheck.checked = true
        const enableGroup = document.createElement("div")
        enableGroup.className = "form-group-h"
        enableGroup.appendChild(enableCheck)
        enableGroup.appendChild(enableLabel)
    
        const destinationSelect = document.createElement("select")
        destinationSelect.id = "destinationSelect"
        destinationSelect.required = true
        // destinationSelect.innerHTML = 
        const destinationLabel = document.createElement("label")
        destinationLabel.textContent = "ปลายทาง"
        const destinationGroup = document.createElement("div")
        destinationGroup.className = "form-group-h"
        destinationGroup.appendChild(destinationLabel)
        destinationGroup.appendChild(destinationSelect)
    
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
    
        const valueFromVariableSelect = document.createElement("select")
        valueFromVariableSelect.id = "valueFromVariableSelect"
        const valueFromVariableLabel = document.createElement("label")
        valueFromVariableLabel.textContent = "ค่าจากตัวแปร/ข้อมูล"
        const valueFromVariableGroup = document.createElement("div")
        valueFromVariableGroup.className = "form-group-h"
        valueFromVariableGroup.appendChild(valueFromVariableLabel)
        valueFromVariableGroup.appendChild(valueFromVariableSelect)
        valueFromVariableSelect.innerHTML = variables.map(x=>{
            if(x.cate=="input"){
                return `<option value="${x.variable}">อินพุต ${x.name}</option>`
            }else
            if(x.cate=="output"){
                return `<option value="${x.variable}">เอาท์พุต ${x.name}</option>`
            }else
            if(x.cate=="dataslots"){
                return `<option value="${x.variable}">ช่องเก็บข้อมูล ${x.name}</option>`
            }else
            if(x.cate=="modbus"){
                return `<option value="${x.variable}">มอดบัสเซ็นเซอร์ ${x.sensor_name} ค่า ${x.read_name}</option>`
            }else{
                return ""
            }
        }).join("")
    
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
    
        const delaysInput = document.createElement("input")
        delaysInput.id = "delaysInput"
        delaysInput.type = "number"
        delaysInput.required = true
        delaysInput.min = 0
        delaysInput.value = 0
        const delaysLabel = document.createElement("label")
        delaysLabel.textContent = "ดีเลย์ก่อน (วินาที)"
        const delaysGroup = document.createElement("div")
        delaysGroup.className = "form-group-h"
        delaysGroup.appendChild(delaysLabel)
        delaysGroup.appendChild(delaysInput)

        const messageInput = document.createElement("input")
        messageInput.id = "messageInput"
        messageInput.type = "text"
        messageInput.maxLength = 100
        const messageLabel = document.createElement("label")
        messageLabel.textContent = "กำหนดข้อความ"
        const messageGroup = document.createElement("div")
        messageGroup.className = "form-group-h"
        messageGroup.appendChild(messageLabel)
        messageGroup.appendChild(messageInput)     

        const cate = cateSelect.value
        itemDetailsEle.innerHTML = ``
        switch (cate) {
            case "output":
                if(1){
                    itemDetailsEle.appendChild(enableGroup)
                    itemDetailsEle.appendChild(delaysGroup)
                    itemDetailsEle.appendChild(destinationGroup)
                    itemDetailsEle.appendChild(valueFromGroup)
                    itemDetailsEle.appendChild(valueStateGroup)
                    itemDetailsEle.appendChild(valueFromVariableGroup)
                    destinationLabel.textContent = "แล้วสั่ง"
                    destinationSelect.innerHTML = outputs.map((x,xi)=>`<option value="${xi}">${x.name}</option>`)
                    valueStateSelect.innerHTML = `<option value="off">OFF</option>
                    <option value="on">ON</option>
                    <option value="toggle">TOGGLE</option>
                    `
                    valueFromSelect.onchange = ()=>{
                        const isCustom = valueFromSelect.value === "custom"
                        valueFromVariableGroup.style.display = isCustom?"none":"flex"
                        valueFromVariableSelect.disabled = isCustom
                        valueStateGroup.style.display = !isCustom?"none":"flex"
                        valueStateSelect.disabled = !isCustom
                    }
                    valueFromSelect.dispatchEvent( new Event("change") )
                }
                break;
            case "modbus_write":
                if(1){
                    const valueItems = document.createElement("div")
                    valueItems.id = `valueItems`
                    valueItems.className = "form-group-h form-group-wrap"

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

                    addressInput.onchange = ()=>{
                        appendItems(itemDetailsEle, { valueFromGroup,
                            valueGroup,
                            valueStateGroup,
                            valueFromVariableGroup } )
                    }
                    qtyInput.onchange = ()=>{
                        appendItems(itemDetailsEle, { valueFromGroup,
                            valueGroup,
                            valueStateGroup,
                            valueFromVariableGroup } )
                    }

                    itemDetailsEle.appendChild(enableGroup)
                    itemDetailsEle.appendChild(delaysGroup)
                    itemDetailsEle.appendChild(destinationGroup)
                    itemDetailsEle.appendChild(addressGroup)
                    itemDetailsEle.appendChild(qtyGroup)
                    itemDetailsEle.appendChild(valueItems)
                    
                    destinationLabel.textContent = "แล้วสั่ง"                    
                    modWrites.map(x=>{
                        const option = document.createElement("option")
                        option.value = x.item_id
                        option.textContent = x.name
                        option.dataset.data_type = x.data_type
                        option.dataset.fc = x.fc
                        destinationSelect.appendChild(option)
                    })
                    destinationSelect.onchange = ()=>{
                        if(destinationSelect.value==""){ return }
                        const selected = destinationSelect.options[destinationSelect.options.selectedIndex]
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
                    destinationSelect.dispatchEvent( new Event("change") )
                }
                break;
            case "linemessaging":
                if(1){
                    itemDetailsEle.appendChild(enableGroup)
                    itemDetailsEle.appendChild(delaysGroup)
                    itemDetailsEle.appendChild(destinationGroup)
                    itemDetailsEle.appendChild(messageGroup)
                    destinationLabel.textContent = "แล้วส่งข้อความไปที่"
                    if(contacts&&contacts.linemessaging&&contacts.linemessaging.room_id){
                        const items = contacts.linemessaging.room_id
                        destinationSelect.innerHTML = items.map(x=>`<option value="${x.item_id}">${x.name}</option>`)
                    }
                }
                break;
            case "telegram":
                if(1){
                    itemDetailsEle.appendChild(enableGroup)
                    itemDetailsEle.appendChild(delaysGroup)
                    itemDetailsEle.appendChild(destinationGroup)
                    itemDetailsEle.appendChild(messageGroup)
                    destinationLabel.textContent = "แล้วส่งข้อความไปที่"
                    if(contacts&&contacts.telegram&&contacts.telegram.chat_id){
                        const items = contacts.telegram.chat_id
                        destinationSelect.innerHTML = items.map(x=>`<option value="${x.item_id}">${x.name}</option>`)
                    }
                }
                break;
            case "email":
                if(1){
                    itemDetailsEle.appendChild(enableGroup)
                    itemDetailsEle.appendChild(delaysGroup)
                    itemDetailsEle.appendChild(destinationGroup)
                    itemDetailsEle.appendChild(messageGroup)
                    destinationLabel.textContent = "แล้วส่งข้อความไปที่"
                    if(contacts&&contacts.email){
                        const items = contacts.email
                        destinationSelect.innerHTML = items.map(x=>`<option value="${x.item_id}">${x.name}</option>`)
                    }
                }
                break;
            case "tel":
                if(1){
                    itemDetailsEle.appendChild(enableGroup)
                    itemDetailsEle.appendChild(delaysGroup)
                    itemDetailsEle.appendChild(destinationGroup)
                    destinationLabel.textContent = "แล้วส่งโทรไปที่"
                    if(contacts&&contacts.tel){
                        const items = contacts.tel
                        destinationSelect.innerHTML = items.map(x=>`<option value="${x.item_id}">${x.name}</option>`)
                    }
                }
                break;
            case "actionbtn":
                if(1){
                    itemDetailsEle.appendChild(enableGroup)
                    itemDetailsEle.appendChild(delaysGroup)
                    itemDetailsEle.appendChild(destinationGroup)
                    destinationLabel.textContent = "แล้วสั่งปุ่มเสมือน"
                    if(actionBtns){
                        destinationSelect.innerHTML = actionBtns.map(x=>`<option value="${x.item_id}">${x.name}</option>`)
                    }
                }
                break;
            case "tboard":
                if(1){
                    itemDetailsEle.appendChild(enableGroup)
                    itemDetailsEle.appendChild(delaysGroup)
                    itemDetailsEle.appendChild(destinationGroup)
                    itemDetailsEle.appendChild(valueGroup)
                    itemDetailsEle.appendChild(valueStateGroup)
                    destinationLabel.textContent = "แล้วสั่งบอร์ด"
                    valueInput.min = 1
                    valueInput.value = 1
                    valueLabel.textContent = "ช่องเอาท์พุต"
                    valueStateSelect.innerHTML = `<option value="1">ON</option>
                    <option value="0">OFF</option>
                    <option value="2">TOGGLE</option>`
                    if(contacts&&contacts.tboard){
                        const items = contacts.tboard
                        destinationSelect.innerHTML = items.map(x=>`<option value="${x.item_id}">${x.name}</option>`)
                    }
                }
                break;
            case "tboard2":
                if(1){                    
                    destinationLabel.textContent = "ช่องทาง"
                    destinationSelect.innerHTML = `
                    <option value="mqtt">MQTT</option>
                    <option value="http">HTTP REQUEST</option>
                    `
                    const parameterGroup = document.createElement("div")
                    parameterGroup.className = "form-group-v"
                    
                    const addVarBtn = document.createElement("button")
                    addVarBtn.id = "addVarBtn"
                    addVarBtn.className = "bg-blue"
                    addVarBtn.type = "button"
                    addVarBtn.textContent = "เพิ่มตัวแทนข้อมูล"
                    
                    const varItemsArea = document.createElement("div")
                    varItemsArea.id = `varItemsArea`
                    varItemsArea.className = "form-group-v"
                    varItemsArea.innerHTML = `<span style="font-size:.8rem;">แทนค่า "%val?%" ในข้อความ Payload หรือ Body หรือ URL ได้เลย</span>`
                    const varItems = document.createElement("div")
                    varItems.id = `varItems`
                    varItems.className = "form-group-v"
                    varItemsArea.appendChild(varItems)
                    
                    itemDetailsEle.appendChild(enableGroup)
                    itemDetailsEle.appendChild(delaysGroup)
                    itemDetailsEle.appendChild(destinationGroup)
                    itemDetailsEle.appendChild(parameterGroup)
                    itemDetailsEle.appendChild(addVarBtn)
                    itemDetailsEle.appendChild(varItemsArea)

                    addVarBtn.onclick = ()=>{
                        const addCalcBtn = document.createElement("button")
                        addCalcBtn.id = "addCalcBtn"
                        addCalcBtn.className = "bg-blue"
                        addCalcBtn.type = "button"
                        addCalcBtn.textContent = "เพิ่มการคำนวณ"

                        const calcItems = document.createElement("div")
                        calcItems.id = `calcItems`
                        calcItems.className = "form-group-h form-group-wrap"

                        addCalcBtn.onclick = ()=>{
                            const calcOperatorSelect = document.createElement("select")
                            calcOperatorSelect.id = "calcOperatorSelect"
                            calcOperatorSelect.innerHTML = `<option value="f+">ค่า + N</option>
                            <option value="f-">ค่า - N</option>
                            <option value="-r">N - ค่า</option>
                            <option value="f*">ค่า * N</option>
                            <option value="f/">ค่า / N</option>
                            <option value="/r">N / ค่า</option>`
                            const calcOperandInput = document.createElement("input")
                            calcOperandInput.type = "number"
                            calcOperandInput.step = "any"
                            calcOperandInput.id = "calcOperandInput"
                            calcOperandInput.required = true
                            const calsOperandLabel = document.createElement("label")
                            calsOperandLabel.textContent = "N="

                            const calcItem = document.createElement("div")
                            calcItem.id = `calcItem`
                            calcItem.className = "form-group-h"

                            const calcDeleteBtn = document.createElement("button")
                            calcDeleteBtn.type = "button"
                            calcDeleteBtn.className = "bg-red"
                            calcDeleteBtn.textContent = "X"
                            calcDeleteBtn.onclick = ()=>{
                                calcItem.remove()
                            }

                            calcItem.appendChild(calcOperatorSelect)
                            calcItem.appendChild(calsOperandLabel)
                            calcItem.appendChild(calcOperandInput)
                            calcItem.appendChild(calcDeleteBtn)
                            calcItems.appendChild(calcItem)
                        }

                        const varItemDeleteBtn = document.createElement("button")
                        varItemDeleteBtn.type = "button"
                        varItemDeleteBtn.className = "bg-red"
                        varItemDeleteBtn.textContent = "ลบ"
                        varItemDeleteBtn.onclick = ()=>{
                            varItem.remove()
                            updateVarItems()
                        }

                        const variableGroup = valueFromVariableGroup.cloneNode(true)

                        const varItem = document.createElement("div")
                        varItem.id = `varItem`
                        varItem.className = "form-group-h form-group-wrap border-basic"

                        const varItemLabel = document.createElement("label")
                        varItemLabel.id = "varItemLabel"
                        varItemLabel.textContent = ""

                        varItem.appendChild(varItemDeleteBtn)
                        varItem.appendChild(varItemLabel)
                        varItem.appendChild(variableGroup)
                        varItem.appendChild(addCalcBtn)
                        varItem.appendChild(calcItems)
                        varItems.appendChild(varItem)

                        updateVarItems()
                    }

                    function updateVarItems(){
                        const childrens = [...varItems.children]
                        let n = 1
                        for (const item of childrens) {
                            const name = `%val${n}%`
                            item.dataset.name = name
                            item.querySelector(`#varItemLabel`).textContent = `"${name}"`
                            n++
                        }
                    }

                    const targetInput = document.createElement("input")
                    targetInput.id = "targetInput"
                    targetInput.type = "text"
                    targetInput.required = true
                    const targetLabel = document.createElement("label")
                    targetLabel.textContent = ""
                    const targetGroup = document.createElement("div")
                    targetGroup.className = "form-group-h"
                    targetGroup.appendChild(targetLabel)
                    targetGroup.appendChild(targetInput) 

                    const usernameInput = document.createElement("input")
                    usernameInput.id = "usernameInput"
                    usernameInput.type = "text"
                    usernameInput.required = true
                    const usernameLabel = document.createElement("label")
                    usernameLabel.textContent = "ยูสเซอร์เนม"
                    const usernameGroup = document.createElement("div")
                    usernameGroup.className = "form-group-h"
                    usernameGroup.appendChild(usernameLabel)
                    usernameGroup.appendChild(usernameInput) 

                    const passwordInput = document.createElement("input")
                    passwordInput.id = "passwordInput"
                    passwordInput.type = "password"
                    const passwordLabel = document.createElement("label")
                    passwordLabel.textContent = "รหัสผ่าน"
                    const passwordGroup = document.createElement("div")
                    passwordGroup.className = "form-group-h"
                    passwordGroup.appendChild(passwordLabel)
                    passwordGroup.appendChild(passwordInput) 

                    const payloadInput = document.createElement("textarea")
                    payloadInput.id = "payloadInput"
                    payloadInput.rows = 5
                    const payloadLabel = document.createElement("label")
                    const payloadGroup = document.createElement("div")
                    payloadGroup.className = "form-group-h"
                    payloadGroup.appendChild(payloadLabel)
                    payloadGroup.appendChild(payloadInput) 
                    
                    destinationSelect.onchange = ()=>{
                        parameterGroup.innerHTML = ``
                        if(destinationSelect.value==="mqtt"){
                            parameterGroup.appendChild(targetGroup)
                            targetLabel.textContent = "MQTT Topic"
                            parameterGroup.appendChild(usernameGroup)
                            parameterGroup.appendChild(passwordGroup)
                            parameterGroup.appendChild(payloadGroup)
                            payloadLabel.textContent = "เพย์โหลด"
                        }else{
                            parameterGroup.appendChild(targetGroup)
                            targetLabel.textContent = "URL"
                            parameterGroup.appendChild(usernameGroup)
                            parameterGroup.appendChild(passwordGroup)
                            
                            const methodSelect = document.createElement("select")
                            methodSelect.id = "methodSelect"
                            methodSelect.required = true
                            const methodLabel = document.createElement("label")
                            methodLabel.textContent = "Method"
                            const methodGroup = document.createElement("div")
                            methodGroup.className = "form-group-h"
                            methodGroup.appendChild(methodLabel)
                            methodGroup.appendChild(methodSelect)
                            methodSelect.innerHTML = `
                            <option value="get">GET</option>
                            <option value="post">POST</option>
                            <option value="put">PUT</option>
                            <option value="delete">DELETE</option>
                            `
                            parameterGroup.appendChild(methodGroup)
                            parameterGroup.appendChild(payloadGroup)
                            payloadLabel.textContent = "Body"
                            methodSelect.onchange = ()=>{
                                const showPayload = ["post","put"].includes(methodSelect.value)
                                payloadInput.disabled = !showPayload
                                payloadGroup.style.display = showPayload ? "flex" : "none"
                            }
                            methodSelect.dispatchEvent(new Event("change"))
                        }
                    }
                    destinationSelect.dispatchEvent(new Event("change"))
                }
                break;
        }
    }

    cateSelect.dispatchEvent( new Event("change") )

    return itemEle
}