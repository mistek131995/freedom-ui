import "../dist/assets/style.css"
import {ButtonBackground, Input, Button, Flex, FlexJustifyContent, FlexAlignmentItems} from "../dist/main";
import {Select} from "../lib/components/Select";
import {useRef} from "react";

const App = () => {
    const formRef = useRef<HTMLFormElement>(null);

    return <>
        <Flex justifyContent={FlexJustifyContent.around} alignItems={FlexAlignmentItems.center}>
          <Button bg={ButtonBackground.primary}>Button primary</Button>
          <Button bg={ButtonBackground.secondary}>Button secondary</Button>
          <Button bg={ButtonBackground.success}>Button success</Button>
          <Button bg={ButtonBackground.warning}>Button warning</Button>
          <Button bg={ButtonBackground.danger}>Button danger</Button>
        </Flex>

        <div style={{display: "flex", justifyContent: "space-around", marginTop: "1rem"}}>
          <Input placeholder="text"/>
        </div>

        <form ref={formRef} onSubmit={(event) => {
          event.preventDefault()

            if (formRef.current) {
                const formData = new FormData(formRef.current);

                //formData.forEach((value, key) => {
                formData.forEach((value) => {
                    console.log(value);
                });

                console.log(formData);
            }
        }}>
          <Flex style={{maxWidth: "50%"}} justifyContent={FlexJustifyContent.around} alignItems={FlexAlignmentItems.center}>
              <Select placeholder="Выберите что-то" inputAttributes={{name: "select-multi"}} options={[
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

          <Button type="submit">Submit</Button>
        </form>
      </>
      }

export default App