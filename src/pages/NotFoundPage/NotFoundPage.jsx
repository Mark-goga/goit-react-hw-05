import HomePage from "../HomePage/HomePage";
import {Link} from 'react-router-dom'
export default function NotFoundPage() {
  return (
    <div>
      <p>Not found page please go back <Link to='/' elements={<HomePage/>}>Home</Link></p>
    </div>
  )
}