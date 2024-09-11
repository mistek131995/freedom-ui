import "../dist/assets/style.css"
import {Button, ButtonBackground, Flex, AlignmentItems, JustifyContent, Input} from "../dist/main";
import {Checkbox, Form, Radio, Select} from "../lib/main.ts";

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
                <Input name="name" placeholder="text"/>

                <Select placeholder="Выберите что-то" inputAttributes={{style: {width: "50%"}, name: "select-multi"}} options={[
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

            <Flex justifyContent={JustifyContent.around}>
                <Checkbox label="Какой-то чекбокс" name="checkbox"/>

                <Flex >
                    <Radio label="Test 1" name="radio" value="test1"/>
                    <Radio label="Test 2" name="radio" value="test2"/>
                    <Radio label="Test 3" name="radio" value="test3"/>
                </Flex>

                <Button bg={ButtonBackground.success} type="submit">
                    Отправить
                </Button>
            </Flex>
        </Form>
      </>
      }

export default App