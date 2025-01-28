import './checkBox.css'
export const MobileAddTaskButton =()=>{
    return(
        <div className="wrapper h-[60px] w-[60px]">
    <input type="checkbox" id="toogle" className="hidden-trigger hidden" />
    <label htmlFor="toogle" className="circle  h-[60px] w-[60px] relative p-0 m-auto block rounded-full text-center">
      <svg className="absolute top-[50%] left-2/4 ml-[-16px] mt-[-16px] w-[32px] h-[32px] svg" width={48} height={48} xmlSpace="preserve" version="1.1" viewBox="0 0 48 48">
        <image width={48} height={48} xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAbElEQVR4Ae3XwQnFQAiE4eVVsGAP1mkPFjwvQvYSWCQYCYGZv4Dv5MGB5ghcIiDQI+kCftCzNsAR8y5gYu2rwCBAgMBTgEC3rek2yQEtAZoDjso8AyaKexmIDJUZD40AAQIE0gwx449GgMC9/t0b7GTsa7J+AAAAAElFTkSuQmCC"/>
      </svg>
    </label>
  </div>
    )
}