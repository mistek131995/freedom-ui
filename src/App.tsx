import "../dist/assets/style.css"
import {AlignmentItems, Flex, JustifyContent} from "../dist/main";
import {Checkbox, Form, Input, Radio, Select, ToastBackground, Button, ButtonBackground} from "../lib/main.ts";
import {Profile} from "./assets/images/Profile.tsx";
import {useToast} from "../lib/components/Toast/useToast.tsx";

const App = () => {
    const {addToast} = useToast()

    return <>
        <Flex justifyContent={JustifyContent.around} alignItems={AlignmentItems.center}>
          <Button bg={ButtonBackground.primary}
                  onClick={() => addToast({
                      label: "Уведомление для уведомления",
                      description: "Уведомляю о бла бла бла бла",
                      bg: ToastBackground.success
                  })}>
              Button primary
          </Button>
          <Button bg={ButtonBackground.secondary}>Button secondary</Button>
          <Button bg={ButtonBackground.success}>Button success</Button>
          <Button bg={ButtonBackground.warning}>Button warning</Button>
          <Button bg={ButtonBackground.danger} disabled={true}>Button danger</Button>
        </Flex>

        <br/>

        <Form handleSubmit={(form) => console.log(form)}>
            <Flex justifyContent={JustifyContent.around}>
                <Input name="name" placeholder="Placeholder" iconLeft={<Profile/>} label="Label:" disabled={true}/>
                <Select label="Multi-select:" placeholder="Выберите что-то"
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
                    ]} disabled={true}/>
            </Flex>

            <br/>
            <br/>

            <Flex justifyContent={JustifyContent.around}>
                <Checkbox label="Checkbox:" name="checkbox" disabled={true}/>

                <Flex justifyContent={JustifyContent.around} style={{width: "300px"}}>
                    <Radio label="Radio 1" name="radio" value="test1" defaultChecked={true}/>
                    <Radio label="Radio 2" name="radio" value="test2"/>
                    <Radio label="Radio 3" name="radio" value="test3" disabled={true}/>
                </Flex>

                <Button bg={ButtonBackground.success} type="submit">
                    Отправить
                </Button>
            </Flex>
        </Form>
    </>
      }

export default App