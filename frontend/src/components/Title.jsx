import { Link } from "react-router-dom"


function Title({ title, button, buttontext,navto }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-3xl font-[600] text-black capitalize">
        {title}
      </div>
      <Link to={navto}>
        <div className={`${button ? 'block' : 'hidden'} capitalize bg-green-400 p-4 text-md cursor-pointer hover:bg-green-600  text-white rounded-md`}>
           {buttontext}
        </div>
      </Link>
    </div>
  )
}

export default Title
