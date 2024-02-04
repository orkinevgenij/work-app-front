import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import { About } from '../pages/About'
import { Login } from '../pages/Auth/Login'
import { Register } from '../pages/Auth/Register'
import { Categories } from '../pages/Categories'
import { Cities } from '../pages/Cities'
import { Companies } from '../pages/Companies'
import { CreateCompany } from '../pages/Empoyer/CreateCompany'
import { CreateVacancy } from '../pages/Empoyer/CreateVacancy'
import { EditVacancy } from '../pages/Empoyer/EditVacancy'
import { EmployerDashboard } from '../pages/Empoyer/EmployerDashboard'
import { MyCompany } from '../pages/Empoyer/MyCompany'
import { MyVacancies } from '../pages/Empoyer/MyVacancies'
import { ErrorPage } from '../pages/ErrorPage'
import { Home } from '../pages/Home'
import { Profile } from '../pages/Profile'
import { SearchVacancy } from '../pages/SearchVacancy'
import { CreateResume } from '../pages/User/CreateResume'
import { EditResume } from '../pages/User/EditResume'
import { MyResume } from '../pages/User/MyResume'
import { MyVacancyResponse } from '../pages/User/MyVacancyResponse'
import { UserDashboard } from '../pages/User/UserDashboard'
import { VacanciesByCity } from '../pages/VacanciesByCity'
import { VacanciesByCompany } from '../pages/VacanciesByCompany'
import { VacancyByCategory } from '../pages/VacancyByCategory'
import { VacancyDetail } from '../pages/VacancyDetail'
import { EmployerPrivateRoute } from './private/EmployerPrivateRoute'
import { UserPrivateRoute } from './private/UserPrivateRoute'
import { VacancyResponse } from '../pages/Empoyer/VacancyResponse'
import { EditProfile } from '../pages/EditProfile'
import { Resume } from '../pages/Resume'
import { CoverLetter } from '../pages/Empoyer/CoverLetter'
import { ForgotPassword } from '../pages/Auth/ForgotPassword'
import { CandidateList } from '../pages/Empoyer/CandidateList'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />

      {/* Auth */}
      <Route path="auth/register" element={<Register />} />
      <Route path="auth/login" element={<Login />} />
      <Route path="auth/forgot-password" element={<ForgotPassword />} />
      <Route path="auth/profile" element={<Profile />} />
      <Route path="auth/profile/edit" element={<EditProfile />} />

      <Route path="candidates" element={<CandidateList />} />

      {/* Find by company,city,category */}
      <Route path="vacancy/category/:id" element={<VacancyByCategory />} />
      <Route path="vacancy/city/:id" element={<VacanciesByCity />} />
      <Route path="vacancy/company/:id" element={<VacanciesByCompany />} />

      {/* Vacancy detail info */}
      <Route path="vacancy/:id" element={<VacancyDetail />} />
      {/*Search vacancy list */}
      <Route path="vacancy/search" element={<SearchVacancy />} />
      {/*Edit vacancy */}

      <Route path="vacancy/edit/:id" element={<EditVacancy />} />

      {/* Create vacancy */}
      <Route path="" element={<EmployerPrivateRoute />}>
        <Route path="vacancy/create" element={<CreateVacancy />} />
      </Route>
      {/* My Vacancies */}
      <Route path="" element={<EmployerPrivateRoute />}>
        <Route path="vacancies/my" element={<MyVacancies />} />
      </Route>
      {/* Response vacancy */}
      <Route path="" element={<EmployerPrivateRoute />}>
        <Route path="response" element={<VacancyResponse />} />
      </Route>

      <Route path="" element={<UserPrivateRoute />}>
        <Route path="response/user" element={<MyVacancyResponse />} />
      </Route>
      <Route path="cover-letter" element={<CoverLetter />} />

      {/* Resume */}
      <Route path="resume/:id" element={<Resume />} />
      <Route path="" element={<UserPrivateRoute />}>
        <Route path="resume/create" element={<CreateResume />} />
      </Route>

      <Route path="" element={<UserPrivateRoute />}>
        <Route path="resume/my" element={<MyResume />} />
      </Route>

      <Route path="" element={<UserPrivateRoute />}>
        <Route path="resume/edit/:id" element={<EditResume />} />
      </Route>

      {/* List city, companies */}
      <Route path="cities" element={<Cities />} />
      <Route path="companies" element={<Companies />} />
      <Route path="categories" element={<Categories />} />

      {/* Create company */}
      <Route path="" element={<EmployerPrivateRoute />}>
        <Route path="company/create" element={<CreateCompany />} />
      </Route>
      {/* My Companies */}
      <Route path="" element={<EmployerPrivateRoute />}>
        <Route path="company/my" element={<MyCompany />} />
      </Route>

      {/* Dashboard  employer*/}
      <Route path="" element={<EmployerPrivateRoute />}>
        <Route path="employer/dashboard" element={<EmployerDashboard />} />
      </Route>

      {/* Dashboard  user*/}
      <Route path="" element={<UserPrivateRoute />}>
        <Route path="user/dashboard" element={<UserDashboard />} />
      </Route>
    </Route>,
  ),
)
