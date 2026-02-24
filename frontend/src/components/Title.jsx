

const Title = ({txt1,txt2}) => {
  return (
    <div className='inline-flex items-center gap-2 mb-3 bg-gray-100 px-10 py-2'>
        <p className='text-blue-800 font-bold'>{txt1} <span className='text-blue-800 font-bold'>{txt2}</span></p>
        <p className='w-8 sm:w-12 h-px sm:h-0.5 bg-gray-700'></p>
        
    </div>
  )
}

export default Title