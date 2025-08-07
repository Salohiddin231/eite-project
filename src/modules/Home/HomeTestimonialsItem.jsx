import { FaRegStar } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

export default function HomeCtaItem({ subtitle, name }) {
  return (
    <>
      <div className="testimonial">
        <div className="testimonial-img-wrapper">
          <RxAvatar />
        </div>
        <p>{subtitle}</p>
        <div className="testimonial-name-wrapper">
          <h5>{name}</h5>
          <div className="testimonial-starts">
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
          </div>
        </div>
      </div>
    </>
  )
}
