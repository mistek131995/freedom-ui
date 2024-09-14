# Возможно это будет UI библиотека

## Импорт стилей:

>`import "@mistek/freedom-ui/dist/assets/style.css"`

## Элементы интерфейса:

**[Кнопки:](https://github.com/mistek131995/freedom-ui/wiki/%D0%AD%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F#%D0%BA%D0%BD%D0%BE%D0%BF%D0%BA%D0%B0)**

>`<Button bg={ButtonBackground.primary}>Button</Button>`

![Кнопки](https://s.iimg.su/s/13/Ak8uet55kAJkCV2dGAqpxWYcrqpm7gVv85qttaPR.png)

**[Текстовое поле:](https://github.com/mistek131995/freedom-ui/wiki/%D0%AD%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F#%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%BF%D0%BE%D0%BB%D0%B5)**

>`<Input label="Label:" name="name" placeholder="Placeholder" iconLeft={<Profile/>}/>`

![Текстовое поле](https://s.iimg.su/s/13/5emM2ylsmhQkS4b7NwmlXlkwuHp88G1vqvkUHmsM.jpg)

**[Checkbox:](https://github.com/mistek131995/freedom-ui/wiki/%D0%AD%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F#checkbox)**

>`<Checkbox label="Checkbox:" name="checkbox"/>`

![Checkbox](https://s.iimg.su/s/13/qUdR0iU4iBQ69yABuOKQaikufya0FfGw3H8L4x4a.jpg)

**[Radio:](https://github.com/mistek131995/freedom-ui/wiki/%D0%AD%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F#radio)**

>`<Radio label="Radio 1" name="radio" value="radio1" checked/>`

![Radio](https://s.iimg.su/s/14/mUkK0ORkiPbBRETCmHzMRtNiseelL4NTHrk5qYr0.png)

**Multi Select & Single Select (Beta):**

>`<Select isMulti={true} placeholder="Выберите что-то" name: "select-multi" options={[]}/>`

![Multi Select](https://s2.radikal.cloud/2024/09/14/bandicam-2024-09-14-08-41-12-933.gif)
![Multi Select](https://s2.radikal.cloud/2024/09/14/bandicam-2024-09-14-08-45-09-299.gif)

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