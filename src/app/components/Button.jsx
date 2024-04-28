'use client'

const Button = ({ 
  label, 
  onClick, 
  disabled, 
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button 
        onClick={onClick} 
        disabled={disabled} 
        className={`relative rounded-lg transition w-full disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 
          ${outline ? 'bg-white' : 'bg-green-500'}
          ${outline ? 'border-black' : 'border-green-500'}
          ${outline ? 'text-black' : 'text-white'}
          ${small ? 'py-1' : 'py-2'}
          ${small ? 'text-sm' : 'text-md'}
          ${small ? 'font-light' : 'font-semibold'}
          ${small ? 'border-[1px]' : 'border-[2px]'}
          `}>
      {Icon && (
        <Icon size={24} className="absolute left-4 top-3" />
      )}
      {label}
    </button>
  )
}

export default Button