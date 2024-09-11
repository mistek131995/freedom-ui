# Возможно это будет UI библиотека

## Импорт стилей:

>`import "@mistek/freedom-ui/dist/assets/style.css"`

## Элементы интерфейса:

**Кнопки:**

>`<Button bg={ButtonBackground.primary}>Button</Button>`

![Кнопки](https://s.iimg.su/s/05/wkLsxS7XlDZONTY7L4ERMSeBKIz9rS87dhLbi6ps.png)

**Текстовое поле:**

>`<Input name="name" placeholder="text"/>`

![Текстовое поле](https://s.iimg.su/s/05/C7I9J8IMcowi5hVSi0okyFDGYc2E4WYyTLV0lmxg.jpg)

**Checkbox:**

>`<Checkbox label="Какой-то чекбокс" name="checkbox"/>`

![Checkbox](https://s.iimg.su/s/11/I2LQGd247kLolNzhrslsCCtyRrtd1yjjrC2IyFFd.png)

**Radio:**

>`<Radio label="Test 1" name="radio" value="test1" checked/>`

![Radio](https://s.iimg.su/s/11/63KGillQbiyOdo0w0gXfCKAJFzZ2PfgXsMBg6ovq.png)

**Multi Select (Beta):**

>`<Select placeholder="Выберите что-то" inputAttributes={{name: "select-multi"}} options={[]}/>`

![Multi Select](https://s.iimg.su/s/09/DeS9hD2KbgZgt7ao6iQOZMfk0CdkL7WHv9oXMnEX.jpg)

## Сетки (Позиционирование элементов)

**Flex контейнер:**

Используется для компоновки других элементов.

>`<Flex justifyContent={JustifyContent.around} alignItems={AlignmentItems.center}>Elements</Flex>`

`justifyContent={JustifyContent.around} - Горизонтальное позиционирование`

`alignItems={AlignmentItems.center} - Вертикальное позиционирование`

## Функциональные компоненты

**Компонент формы:**

>`<Form handleSubmit={(form) => console.log(form)}>Inputs|Select|...</Form>`

`handleSubmit={(form) => console.log(form)} - Получаем массив [name]: value при срабатывании onSubmit`