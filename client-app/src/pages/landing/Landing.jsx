import { NavLink } from 'react-router-dom'


import "../../styles/Landing/Landing.modules.css"

const Landing = () => {
  return(
    <div className='containerHeader' >
      <div className='containerMain container' >
        <div className="item">
          <h1>CodeLearn</h1>
          <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              Mollitia, deserunt rerum. Aspernatur, quos. 
              Quasi dolores earum, non minus ipsa iure sunt, 
              odio distinctio assumenda ullam sit ea perferendis quaerat facilis?
          </p>

          <div className='containerButton'>
            <NavLink to='Home'><button> ir a conocer los cursos </button></NavLink>

            <NavLink to='Register'><button> Registrarme </button></NavLink>
          </div>

        </div>
        <div className="item">
            <img src="../../../public/img/Landing_Draw.svg" alt="Landing"/>
        </div>
      </div>
    </div>
  )
}

export default Landing;