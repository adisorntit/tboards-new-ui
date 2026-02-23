function appendItems(parent, masterElements, selectFrom=true)
{
    const destinationSelect = parent.querySelector(`#destinationSelect`)
    const valueItems = parent.querySelector(`#valueItems`)
    const addressInput = parent.querySelector(`#addressInput`)
    const qtyInput = parent.querySelector(`#qtyInput`)
    const addressGroup = addressInput.parentElement

    const { valueFromGroup,
            valueGroup,
            valueStateGroup,
            valueFromVariableGroup } = masterElements || {}

    const destinationSelected = destinationSelect.options[destinationSelect.options.selectedIndex]
    const data_type = destinationSelected.dataset.data_type
    const fc = parseInt(destinationSelected.dataset.fc)
    valueItems.innerHTML = ''
    if(data_type=="no"){
        addressInput.disabled = true
        addressGroup.style.display = "none"
        return
    }
    addressInput.disabled = false
    addressGroup.style.display = "flex"

    const n = parseInt(qtyInput.value)
    for (let i = 0; i < n; i++) {
        const valueItem = document.createElement("div")
        valueItem.className = "form-group-h form-group-wrap border-basic"
        valueItem.dataset.address = parseInt(addressInput.value)+i
        const registerLabel = document.createElement("label")
        registerLabel.textContent = "รีจิสเตอร์ " + (parseInt(addressInput.value)+i)

        const valueFromGroup_item = valueFromGroup.cloneNode(true)

        const valueGroup_item = valueGroup.cloneNode(true)

        const valueStateGroup_item = valueStateGroup.cloneNode(true)

        const valueFromVariableGroup_item = valueFromVariableGroup.cloneNode(true)

        valueItem.appendChild(registerLabel)
        valueItem.appendChild(valueFromGroup_item)
        valueItem.appendChild(valueGroup_item)
        valueItem.appendChild(valueStateGroup_item)
        valueItem.appendChild(valueFromVariableGroup_item)
        valueItems.appendChild(valueItem)  
        const _valueFromSelect = valueFromGroup_item.querySelector(`#valueFromSelect`)
        const _valueFromVariableSelect = valueFromVariableGroup_item.querySelector(`#valueFromVariableSelect`)
        const _valueInput = valueGroup_item.querySelector(`#valueInput`)
        _valueInput.value = 0
        const _valueStateSelect = valueStateGroup_item.querySelector(`#valueStateSelect`)
        _valueStateSelect.innerHTML = `<option value="off">OFF</option>
        <option value="on">ON</option>`

        const valueTypeSelect = document.createElement("select")
        valueTypeSelect.id = "valueTypeSelect"
        valueTypeSelect.innerHTML = `<option value="int16">INT16</option><option value="uint16">UINT16</option><option value="int32">INT32</option><option value="uint32">UINT32</option><option value="float32">FLOAT32</option><option value="int64">INT64</option><option value="uint64">UINT64</option><option value="float64">FLOAT64</option>`
        const valueTypeLabel = document.createElement("label")
        valueTypeLabel.textContent = "ชนิดข้อมูล"
        const valueTypeGroup = document.createElement("div")
        valueTypeGroup.className = "form-group-h"
        valueTypeGroup.appendChild(valueTypeLabel)
        valueTypeGroup.appendChild(valueTypeSelect)

        const valueFormatSelect = document.createElement("select")
        valueFormatSelect.id = "valueFormatSelect"
        const valueFormatLabel = document.createElement("label")
        valueFormatLabel.textContent = "รูปแบบ"
        const valueFormatGroup = document.createElement("div")
        valueFormatGroup.className = "form-group-h"
        valueFormatGroup.appendChild(valueFormatLabel)
        valueFormatGroup.appendChild(valueFormatSelect)

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
            calcOperandInput.value = 1
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

        valueTypeSelect.onchange = ()=>{
            valueFormatSelect.innerHTML = ``
            const valueStr = valueTypeSelect.value
            if(valueStr.indexOf("16")>=0){
                const ret = valueTypeSelectFX(valueItem, valueStr)
                if(!ret){
                    return
                }
                valueFormatSelect.innerHTML = `<option value="big">AB</option><option value="lit">BA</option>`
            }
            if(valueStr.indexOf("32")>=0){
                const ret = valueTypeSelectFX(valueItem, valueStr)
                if(!ret){
                    valueTypeSelect.value = "int16"
                    valueTypeSelect.dispatchEvent( new Event("change") )
                    return
                }
                valueFormatSelect.innerHTML = `<option value="big">AB CD</option>
                <option value="lit">DC BA</option>
                <option value="big-swap">BA DC</option>
                <option value="lit-swap">CD AB</option>`
            }
            if(valueStr.indexOf("64")>=0){
                const ret = valueTypeSelectFX(valueItem, valueStr)
                if(!ret){
                    valueTypeSelect.value = "int16"
                    valueTypeSelect.dispatchEvent( new Event("change") )
                    return
                }
                valueFormatSelect.innerHTML = `<option value="big">AB CD EF GH</option>
                <option value="lit">HG FE DC BA</option>
                <option value="big-swap">BA DC FE HG</option>
                <option value="lit-swap">GH EF CD AB</option>`
            }
        }
        function valueTypeSelectFX(nowEle, valueStr)
        {
            const itemAll = [...valueItems.children]
            const index = itemAll.indexOf(nowEle);
            const posDiff = itemAll.length - index
            if(valueStr.indexOf("16")>=0){}else
            if(valueStr.indexOf("32")>=0){
                if(posDiff < 2){
                    return false
                }
            }else
            if(valueStr.indexOf("64")>=0){
                if(posDiff < 4){
                    return false
                }
            }else{
                return false
            }


            for (let i = 1; i < 8; i++) {  
                const element = itemAll[index+i];  
                if(element)
                {
                    const valueFromSelectEle = element.querySelector(`#valueFromSelect`)
                    const valueInputEle = element.querySelector(`#valueInput`)
                    const valueFromVariableSelectEle = element.querySelector(`#valueFromVariableSelect`)
                    const valueTypeSelectEle = element.querySelector(`#valueTypeSelect`)
                    const valueFormatSelectEle = element.querySelector(`#valueFormatSelect`)
                    const addCalcBtnEle = element.querySelector(`#addCalcBtn`)
                    const calcItemsEle = element.querySelector(`#calcItems`)

                    
                    function setEnable(){
                        valueFromSelectEle.disabled = false
                        valueInputEle.disabled = false
                        valueFromVariableSelectEle.disabled = false
                        valueTypeSelectEle.disabled = false
                        valueFormatSelectEle.disabled = false
                        addCalcBtnEle.disabled = false
                        valueTypeSelectEle.dispatchEvent( new Event("change") )
                    }
                    function setDisable(){
                        valueFromSelectEle.disabled = true
                        valueFromSelectEle.value = "custom"
                        valueFromSelectEle.dispatchEvent( new Event("change") )
                        valueInputEle.disabled = true
                        valueFromVariableSelectEle.disabled = true
                        valueTypeSelectEle.disabled = true
                        valueTypeSelectEle.value = "int16"
                        valueTypeSelectEle.dispatchEvent( new Event("change") )
                        valueFormatSelectEle.disabled = true
                        addCalcBtnEle.disabled = true
                        calcItemsEle.innerHTML = ""
                    }

                    const nowDisabled = addCalcBtnEle.disabled                    
                    if(valueStr.indexOf("16")>=0){
                        console.log(16);                        
                        if(nowDisabled)
                        {
                            setEnable()
                            break
                        }else{ break }
                    }
                    if(valueStr.indexOf("32")>=0){
                        console.log(32);
                        
                        if(i==1){
                            setDisable()
                        }else{
                            if(nowDisabled)
                            {
                                setEnable()
                                break
                            }else{ break }
                        }
                    }
                    if(valueStr.indexOf("64")>=0){
                        console.log(64);
                        
                        if(i<4){
                            setDisable()
                        }else{
                            if(nowDisabled)
                            {
                                setEnable()
                                break
                            }else{ break }
                        }
                    }
                }
            }
            return true
        }
        const isNumberic = data_type == "numberic"
        if(isNumberic){ // isNumberic
            
            _valueStateSelect.disabled = true
            valueStateGroup_item.style.display = "none"

            
            valueFormatSelect.disabled = qtyInput.disabled
            valueFormatGroup.style.display = qtyInput.disabled?"none":"flex"
            if(!qtyInput.disabled)
            {
                valueItem.appendChild(valueTypeGroup)
                valueItem.appendChild(valueFormatGroup)
                valueTypeSelect.dispatchEvent( new Event("change") )
            }
            valueItem.appendChild(addCalcBtn)
            valueItem.appendChild(calcItems)

            if(selectFrom){
                _valueFromSelect.disabled = false
                valueFromGroup_item.style.display = "flex"
    
                _valueFromSelect.onchange = ()=>{
                    const isCustom = _valueFromSelect.value=="custom"
                    _valueFromVariableSelect.disabled = isCustom
                    valueFromVariableGroup_item.style.display = isCustom?"none":"flex"
                    _valueInput.disabled = !isCustom
                    valueGroup_item.style.display = !isCustom?"none":"flex"
                }
            }else{
                _valueFromSelect.disabled = true
                valueFromGroup_item.style.display = "none"
                _valueFromVariableSelect.disabled = true
                valueFromVariableGroup_item.style.display = "none"
            }
            _valueFromSelect.dispatchEvent( new Event("change") )
        }else{
            _valueFromSelect.disabled = true
            valueFromGroup_item.style.display = "none"
            _valueInput.disabled = true
            valueGroup_item.style.display = "none"
            _valueFromVariableSelect.disabled = true
            valueFromVariableGroup_item.style.display = "none"
            _valueStateSelect.disabled = false
            valueStateGroup_item.style.display = "flex"
        }
    }
}