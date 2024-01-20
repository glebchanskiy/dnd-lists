function StatRow(props: {
  classes?: string
  value: string | number | string[] | undefined
  onChange: (arg0: any, arg1: string) => void
  name: any
  label: string
}) {
  let classes = 'd-and-d-statrow'
  if (props.classes) {
    classes += ' ' + props.classes
  }

  return (
    <div className={classes}>
      <div className='d-and-d-statrow-value'>
        <input
          type='text'
          value={props.value ? props.value : ''}
          onChange={(e) => props.onChange(props.name, (e.target as HTMLInputElement).value)}
        />
      </div>
      <div className='d-and-d-statrow-label'>
        <label>{props.label}</label>
      </div>
    </div>
  )
}

export default StatRow
