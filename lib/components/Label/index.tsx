import styles from './styles.module.scss'

export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const { className, ...restProps } = props
  const unionClassName = [className, styles.label].filter(x => x).join(" ")

  return <label className={unionClassName} {...restProps} />
}