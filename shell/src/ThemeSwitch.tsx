import { useTheme } from '@mfes-demo/ui-lib'

function ThemeSwitch() {
  const { name, toggleTheme } = useTheme()
  const isDark = name === 'dark'

  return (
    <label className="switch">
      <span className="switchLabel">{isDark ? 'Dark' : 'Light'}</span>
      <input
        className="switchInput"
        type="checkbox"
        role="switch"
        checked={isDark}
        onChange={toggleTheme}
      />
      <span className="switchTrack" aria-hidden="true" />
    </label>
  )
}

export default ThemeSwitch
