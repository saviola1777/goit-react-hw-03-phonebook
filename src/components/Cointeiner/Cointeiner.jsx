import css from "components/Cointeiner/Cointeiner.module.css"
const Cointeiner =({children})=>{
  return(
    <div className={css.cointeiner}>{children}</div>
  )
}

export default Cointeiner