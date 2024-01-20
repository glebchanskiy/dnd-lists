

function AttackTable(props: {
  onChange: (arg0: any, arg1: any) => void
  name: string
  value?: any
  classes?: string
  rows: number
}) {
  function updateValue(index: string, field: string, v: string) {
    console.log(index, field, v)
    const value = getValue().slice()
    console.log(value)

    const f = {...value[index]}
    f[field] = v

    value[index] = f

    console.log(value)
    props.onChange(props.name, value)
  }

  function getValue() {
    let value = props.value
    if (!value) {
      value = []
    }

    while (value.length < props.rows) {
      value.push({name: '', bonus: '', damage: ''})
    }
    return value
  }

  let classes = 'd-and-d-table'
  if (props.classes) {
    classes += ' ' + props.classes
  }

  return (
    <table className={classes}>
      <thead>
        <tr>
          <th>Name</th>
          <th style={{ width: '70px' }}>Atk Bonus</th>
          <th>Damage/Type</th>
        </tr>
      </thead>
      <tbody>
        {getValue().map(
          (
            v: {
              name: string | number | string[] | undefined
              bonus: string | number | string[] | undefined
              damage: string | number | string[] | undefined
            },
            index: string
          ) => {
            return (
              <tr key={'d-and-d-table-row-' + props.name + index}>
                <td>
                  <input
                    type='text'
                    value={v.name ? v.name : ''}
                    onChange={(e) => updateValue(index, 'name',  (e.target as HTMLInputElement).value)}
                  />
                </td>
                <td>
                  <input
                    type='text'
                    value={v.bonus ? v.bonus : ''}
                    onChange={(e) =>
                      updateValue(index, 'bonus',  (e.target as HTMLInputElement).value)
                    }
                  />
                </td>
                <td>
                  <input
                    type='text'
                    value={v.damage ? v.damage : ''}
                    onChange={(e) =>
                      updateValue(index, 'damage',  (e.target as HTMLInputElement).value)
                    }
                  />
                </td>
              </tr>
            )
          }
        )}
      </tbody>
    </table>
  )
}

export default AttackTable
