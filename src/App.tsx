import React, {useEffect, useRef, useState} from 'react';
import Menu from "./components/Menu/menu";
import MenuItem from './components/Menu/menuItem'
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import Tabs from "./components/Tabs/tabs";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from '@fortawesome/free-solid-svg-icons'
import Input from "./components/Input/input";
import axios from "axios";
import TabItem from "./components/Tabs/tabItem";
import Form, {IFormRef} from "./components/Form/form";
import FormItem from "./components/Form/formItem";
import {RuleItem, ValidateError} from "async-validator";
import {CustomRule} from "./components/Form/useStore";
import Button from "./components/Button/button";

library.add(fas)

function App() {
    const [title, setTitle] = useState('')
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts/1').then(resp => {
            setTitle(resp.data.title)
        })
    })
    const confirmRules:CustomRule[]=[
        {type:'string',required:true,min:3,max:8},
        ({getFieldValue})=>({
            asyncValidator(rule,value){
                return new Promise((resolve, reject) => {
                    if (value !== getFieldValue('password')) {
                        reject('The two passwords that you entered do not match!')
                    }else {
                        resolve()
                    }

                })
            }
        })
    ]
    const onFinish=(values:Record<string, any>)=>{
        console.log(values)
    }
    function handleClick() {
        console.log(ref.current)
    }
    const onFinishFailed=(values:Record<string, any>,errors:Record<string, ValidateError[]>)=>{
        console.log('val',values)
        console.log('eerrr',errors)
    }
    const ref = useRef<IFormRef| null>(null)
    return (
        <div className="App">
            <Tabs>
                <TabItem label="111">
                    3333
                </TabItem>
            </Tabs>

            <Form ref={ref}
                  name="form"
                  initialValues={{userName: '2222'}}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}>
                <FormItem rules={[{type: 'email', required: true}]} label="姓名" name="userName">
                    <Input></Input>
                </FormItem>
                <FormItem name="password" label="密码">
                    <Input type="password"></Input>
                </FormItem>
                <FormItem rules={confirmRules} name="password1" label="重复密码">
                    <Input type="password1"></Input>
                </FormItem>
                <Button type='submit' onClick={handleClick}>提交</Button>
            </Form>
            {/*<h2>{title}</h2>*/}
            {/*<Input*/}
            {/*    size="lg"*/}
            {/*    defaultValue="22"*/}
            {/*    icon="coffee"*/}
            {/*    prepend={<div>222</div>}*/}
            {/*    onChange={e=>{console.log(e.target)}}*/}
            {/*></Input>*/}
            {/*<Icon icon="coffee" theme="primary"/>*/}


            {/*<Menu defaultIndex='2' mode='vertical'  onSelect={handleClick} defaultOpenSubMenus={['2']}>*/}
            {/*    <MenuItem>color index</MenuItem>*/}
            {/*    <MenuItem>color index</MenuItem>*/}
            {/*    <SubMenu title='2'>*/}
            {/*        <MenuItem>2</MenuItem>*/}
            {/*    </SubMenu>*/}
            {/*</Menu>*/}


        </div>
    );
}



export default App;
