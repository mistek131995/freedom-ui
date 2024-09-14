import "../dist/assets/style.css"
import {Button, ButtonBackground, Flex, AlignmentItems, JustifyContent} from "../dist/main";
import {Checkbox, Form, Input, Radio, Select} from "../lib/main.ts";
import {Profile} from "./assets/images/Profile.tsx";

const App = () => {

    return <>
        <Flex justifyContent={JustifyContent.around} alignItems={AlignmentItems.center}>
          <Button bg={ButtonBackground.primary}>Button primary</Button>
          <Button bg={ButtonBackground.secondary}>Button secondary</Button>
          <Button bg={ButtonBackground.success}>Button success</Button>
          <Button bg={ButtonBackground.warning}>Button warning</Button>
          <Button bg={ButtonBackground.danger}>Button danger</Button>
        </Flex>

        <br/>

        <Form handleSubmit={(form) => console.log(form)}>
            <Flex justifyContent={JustifyContent.around}>
                <Input name="name" placeholder="Placeholder" iconLeft={<Profile/>} label="Label:"/>

                {/*<Select placeholder="Выберите что-то" inputAttributes={{style: {width: "50%"}, name: "select-single"}} options={[*/}
                {/*    {value: "test1", label: "Test 1"},*/}
                {/*    {value: "test2", label: "Test 2"},*/}
                {/*    {value: "test3", label: "Test 3"},*/}
                {/*    {value: "test4", label: "Test 4"},*/}
                {/*    {value: "test5", label: "Test 5"},*/}
                {/*    {value: "test6", label: "Test 6"},*/}
                {/*    {value: "test7", label: "Test 7"},*/}
                {/*    {value: "test8", label: "Test 8"},*/}
                {/*    {value: "test9", label: "Test 9"},*/}
                {/*]}/>*/}

                <Select label="Multi-select:" placeholder="Выберите что-то"
                    //isMulti={true}
                        name="milti-select"
                        options={[
                            {value: "test1", label: "Test 1"},
                            {value: "test2", label: "Test 2"},
                            {value: "test3", label: "Test 3"},
                            {value: "test4", label: "Test 4"},
                            {value: "test5", label: "Test 5"},
                            {value: "test6", label: "Test 6"},
                            {value: "test7", label: "Test 7"},
                            {value: "test8", label: "Test 8"},
                            {value: "test9", label: "Test 9"},
                        ]}/>
            </Flex>

            <br/>
            <br/>

            <Flex justifyContent={JustifyContent.around}>
                <Checkbox label="Checkbox:" name="checkbox"/>

                <Flex justifyContent={JustifyContent.around} style={{width: "300px"}}>
                    <Radio label="Radio 1" name="radio" value="test1" defaultChecked={true}/>
                    <Radio label="Radio 2" name="radio" value="test2"/>
                    <Radio label="Radio 3" name="radio" value="test3"/>
                </Flex>

                <Select style={{maxWidth: "20%"}} label="Single-select:" placeholder="Выберите что-то"
                    //isMulti={true}
                        name="milti-select"
                        options={[
                            {value: "test1", label: "Test 1"},
                            {value: "test2", label: "Test 2"},
                            {value: "test3", label: "Test 3"},
                            {value: "test4", label: "Test 4"},
                            {value: "test5", label: "Test 5"},
                            {value: "test6", label: "Test 6"},
                            {value: "test7", label: "Test 7"},
                            {value: "test8", label: "Test 8"},
                            {value: "test9", label: "Test 9"},
                        ]}/>

                <Button bg={ButtonBackground.success} type="submit">
                    Отправить
                </Button>
            </Flex>
        </Form>
    </>
      }

export default App