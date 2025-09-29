import { defineComponent, resolveDynamicComponent } from 'vue'
import './style.scss'

export default defineComponent({
  name: 'BaseInput',
  props: {
    uiTarget: {
      // bisa string ('input' | 'textarea') atau komponen
      type: [String, Object],
      default: 'input'
    },
    customClass: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: '' // <--- tambahkan label sebagai prop
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请填写'
    },
    maxlength: {
      type: Number,
      default: 500
    },
    minlength: {
      type: Number,
      default: 0
    },
    value: {
      type: String,
      default: ''
    }
  },
  emits: ['input', 'change', 'blur', 'focus'],
  setup(props, { emit }) {
    const onBlur = (e) => {
      emit('blur', e)
    }
    const onInput = (e) => {
      // emit value agar mudah dipakai seperti v-model; ubah jika perlu emit event lengkap
      const v = e && e.target ? e.target.value : e
      emit('input', v)
    }
    const onChange = (e) => {
      emit('change', e)
    }
    const onFocus = (e) => {
      if (props.readonly) return false
      emit('focus', e)
    }
    return {
      onBlur,
      onInput,
      onFocus,
      onChange
    }
  },
    render() {
    const { uiTarget, customClass } = this
    const inputId = this.name || 'input-' + Math.random().toString(36).slice(2, 9)
    const labelId = `${inputId}-label`

    const Comp = resolveDynamicComponent(uiTarget) // <- penting

    const ariaLabel = this.label || this.placeholder || this.name || undefined
    const ariaLabelledby = this.label ? labelId : undefined

    return (
      <div class="input-wrapper">
        {this.label ? (
          <label id={labelId} for={inputId} class="input-label">
            {this.label}
          </label>
        ) : null}

        <Comp
          id={inputId}
          class={['input-box item-border', customClass]}
          type={this.type}
          name={this.name}
          field={this.field}
          readonly={this.readonly}
          placeholder={this.placeholder}
          value={this.value}
          maxlength={this.maxlength}
          minlength={this.minlength}
          autocomplete="off"
          aria-label={this.label ? undefined : ariaLabel}
          aria-labelledby={this.label ? ariaLabelledby : undefined}
          onInput={this.onInput}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
        />
      </div>
    )
  }
})
