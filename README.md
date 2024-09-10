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



**Multi Select (Beta):**

>`<Select placeholder="Выберите что-то" inputAttributes={{name: "select-multi"}} options={[]}/>`

![Multi Select](https://s.iimg.su/s/09/DeS9hD2KbgZgt7ao6iQOZMfk0CdkL7WHv9oXMnEX.jpg)

## Сетки (Позиционирование элементов)

**Flex контейнер:**

Используется для компоновки других элементов.

>`<Flex justifyContent={FlexJustifyContent.around} alignItems={FlexAlignmentItems.center}>Elements</Flex>`

`justifyContent={FlexJustifyContent.around} - Горизонтальное позиционирование`
`alignItems={FlexAlignmentItems.center} - Вертикальное позиционирование`

## Функциональные компоненты

**Компонент формы:**

>`<Form handleSubmit={(form) => console.log(form)}>Inputs|Select|...</Form>`

`handleSubmit={(form) => console.log(form)} - Получаем массив [name]: value при срабатывании onSubmit`