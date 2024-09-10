import "../dist/assets/style.css"
import {ButtonBackground, Input, Button, Flex, FlexJustifyContent, FlexAlignmentItems} from "../dist/main";
import {Form, Select} from "../lib/main.ts";

const App = () => {

    return <>
        <Flex justifyContent={FlexJustifyContent.around} alignItems={FlexAlignmentItems.center}>
          <Button bg={ButtonBackground.primary}>Button primary</Button>
          <Button bg={ButtonBackground.secondary}>Button secondary</Button>
          <Button bg={ButtonBackground.success}>Button success</Button>
          <Button bg={ButtonBackground.warning}>Button warning</Button>
          <Button bg={ButtonBackground.danger}>Button danger</Button>
        </Flex>

        <div style={{display: "flex", justifyContent: "space-around", marginTop: "1rem"}}>
          <Input name="name" placeholder="text"/>
        </div>

        <Form handleSubmit={(form) => console.log(form)}>
            <input name="test"/>
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

            <button type="submit">Submit</button>
        </Form>
      </>
      }

export default App