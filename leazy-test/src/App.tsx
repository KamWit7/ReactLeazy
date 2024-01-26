import { Outlet, Route, Routes } from "react-router"
import { BrowserRouter, Link } from "react-router-dom"
import { Suspense, lazy } from "react"

const Home = lazy(() => wait(2000).then(() => import("./pages/Home")))
const About = lazy(() => import("./pages/About"))

//named export
const Products = lazy(() =>
  import("./pages/Products").then((module) => ({ default: module.Products }))
)

interface AddModule {
  add: (a: number, b: number) => number
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <section>
              <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/products">Products</Link>
              </nav>

              <button
                onClick={() => {
                  import("./utils/add").then((module: AddModule) => {
                    alert(module.add(2, 2))
                  })
                }}
              >
                Add 2+2
              </button>
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
              </Suspense>
            </section>
          }
        >
          <Route path="/" element={<Home />} /> {/* Strona główna */}
          <Route path="/about" element={<About />} /> {/* O nas */}
          <Route path="/products" element={<Products />} /> {/* Produkty */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
