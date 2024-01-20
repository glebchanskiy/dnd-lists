

function Currency(props: {
  classes?: string
  label: string
  value: string | number | string[] | undefined
  onChange: (arg0: any, arg1: string) => void
  name: any
}) {
  let classes = 'd-and-d-currency'
  if (props.classes) {
    classes += ' ' + props.classes
  }

  return (
    <div className={classes}>
      <div className='d-and-d-currency-label'>
        <label>{props.label}</label>
      </div>
      <div className='d-and-d-currency-value'>
        <input
          type='text'
          value={props.value ? props.value : ''}
          onChange={(e) => props.onChange(props.name,  (e.target as HTMLInputElement).value)}
        />
      </div>
    </div>
  )
}

export default Currency
