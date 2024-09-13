# Возможно это будет UI библиотека

## Импорт стилей:

>`import "@mistek/freedom-ui/dist/assets/style.css"`

## Элементы интерфейса:

**Кнопки:**

>`<Button bg={ButtonBackground.primary}>Button</Button>`

![Кнопки](https://s.iimg.su/s/13/Ak8uet55kAJkCV2dGAqpxWYcrqpm7gVv85qttaPR.png)

**Текстовое поле:**

>`<Input label="Label:" name="name" placeholder="Placeholder" iconLeft={<Profile/>}/>`

![Текстовое поле](https://s.iimg.su/s/13/5emM2ylsmhQkS4b7NwmlXlkwuHp88G1vqvkUHmsM.jpg)

**Checkbox:**

>`<Checkbox label="Какой-то чекбокс" name="checkbox"/>`

![Checkbox](https://s.iimg.su/s/11/I2LQGd247kLolNzhrslsCCtyRrtd1yjjrC2IyFFd.png)

**Radio:**

>`<Radio label="Test 1" name="radio" value="test1" checked/>`

![Radio](https://s.iimg.su/s/11/63KGillQbiyOdo0w0gXfCKAJFzZ2PfgXsMBg6ovq.png)

**Multi Select & Single Select (Beta):**

>`<Select isMulti={true} placeholder="Выберите что-то" inputAttributes={{name: "select-multi"}} options={[]}/>`

![Multi Select](https://s2.radikal.cloud/2024/09/11/bandicam-2024-09-11-23-20-33-065.gif)

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