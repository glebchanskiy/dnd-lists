import { beautifyNumber, calcModifier } from "../utils"


function StatBox(props: {
  classes?: string
  value: string | number | undefined
  label: string
  onChange: (arg0: any, arg1: string) => void
  name: any
}) {
  let classes = "d-and-d-statbox"
  if (props.classes) {
    classes += " " + props.classes
  }

  let modifier = beautifyNumber(calcModifier(props.value))

  console.log(calcModifier(props.value))
  console.log(beautifyNumber(calcModifier(props.value)))

  return (
    <div>
      <div className={classes}>
        <label>{props.label}</label>
        <div className="d-and-d-statbox-modifier">{modifier}</div>
      </div>
      <div className="d-and-d-statbox-value">
        <input
          type="text"
          value={props.value ? props.value : ""}
          onChange={(e) =>
            props.onChange(props.name, (e.target as HTMLInputElement).value)
          }
        />
      </div>
    </div>
  )
}

export default StatBox
