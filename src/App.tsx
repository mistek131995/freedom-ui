import "../dist/assets/style.css"
import {AlignmentItems, Flex, JustifyContent} from "../dist/main";
import {Background, Button, ButtonBackground, Checkbox, Form, Input, Orientation, Radio, Select} from "../lib/main.ts";
import {Profile} from "./assets/images/Profile.tsx";
import {useToast} from "../lib/components/Toast/useToast.tsx";
import {Textarea} from "../lib/components/Textarea";
import {DatePicker} from "../lib/components/Datepicker";
import {DateRangePicker} from "../lib/components/DateRangePicker";
import {TopMenu} from "../lib/components/TopMenu";
import {TopMenuItem} from "../lib/components/TopMenu/TopMenuItem.tsx";
import {TopMenuDropdownItem} from "../lib/components/TopMenu/TopMenuDropdownItem.tsx";
import {Alert} from "../lib/components/Alert";
import {VerticalMenuItem} from "../lib/components/VerticalMenu/VerticalMenuItem.tsx";
import {VerticalMenu} from "../lib/components/VerticalMenu";

const App = () => {
    const {addToast} = useToast()

    return <>
        <TopMenu>
            <TopMenuDropdownItem title="Аккаунт">
                <TopMenuItem title="1111"/>
                <TopMenuItem title="Вход"/>
            </TopMenuDropdownItem>
            <TopMenuItem title="Item 1"/>
            <TopMenuItem title="Item 2"/>
            <TopMenuItem title="Item 3"/>
        </TopMenu>

        <br/>

        <Flex justifyContent={JustifyContent.around} alignItems={AlignmentItems.center}>
          <Button bg={ButtonBackground.primary}
                  onClick={() => addToast({
                      label: "Уведомление для уведомления",
                      description: "Уведомляю о бла бла бла бла",
                      bg: Background.success
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
                <Input orientation={Orientation.horizontal} name="name" placeholder="Placeholder" iconLeft={<Profile/>}
                       label="Label:"/>
                <Select orientation={Orientation.horizontal}
                        label="Multi-select:"
                        placeholder="Выберите что-то"
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
                <Checkbox orientation={Orientation.horizontal} label="Checkbox:" name="checkbox" disabled={true}/>

                <Flex justifyContent={JustifyContent.around} style={{width: "300px"}}>
                    <Radio label="Radio 1" name="radio" value="test1" defaultChecked={true}/>
                    <Radio label="Radio 2" name="radio" value="test2"/>
                    <Radio label="Radio 3" name="radio" value="test3" disabled={true}/>
                </Flex>

                <Button bg={ButtonBackground.success} type="submit">
                    Отправить
                </Button>
            </Flex>

            <br/>

            <br/>

            <Flex justifyContent={JustifyContent.around}>
                <Textarea orientation={Orientation.horizontal} label="Textarea:" placeholder="Placeholder"
                          rows={3}/>

                <DatePicker orientation={Orientation.horizontal} label="Календарь:" onDateChange={(date) => console.log(date)} name="datapicker"/>

                <DateRangePicker orientation={Orientation.vertical} label="Календарь:" onRangeSelect={(startDate, endDate) => console.log(`${startDate} ${endDate}`)} />
            </Flex>
        </Form>

        <br/>
        <Alert>Какой-то текст... бла, бла, бла...</Alert>
        <br/>
        <Alert background={Background.success}>Какой-то текст... бла, бла, бла...</Alert>
        <br/>
        <Alert background={Background.warning}>Какой-то текст... бла, бла, бла...</Alert>
        <br/>
        <Alert background={Background.danger}>Какой-то текст... бла, бла, бла...</Alert>

        <br/>

        <div style={{maxWidth: "25%", padding: "1rem"}}>
            <VerticalMenu>
                <VerticalMenuItem>Аккаунт</VerticalMenuItem>
                <VerticalMenuItem>Платежи</VerticalMenuItem>
                <VerticalMenuItem>Курсы</VerticalMenuItem>
                <VerticalMenuItem>Выход</VerticalMenuItem>
            </VerticalMenu>
        </div>
    </>
}

export default App