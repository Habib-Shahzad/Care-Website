// export const API = 'http://localhost:3000'
export const API =
   process.env.NEXT_PUBLIC_ENV == 'dev'
      ? 'http://localhost:3000'
      : 'https://asherewecare.pk'
// export const API = 'http://54.169.250.44'
export const NETWORKING_API = `${API}/api`
import axios from 'axios'
axios.defaults.withCredentials = true

enum BlogType {
   PATIENT_WELFARE = 'PATIENT_WELFARE',
   COMMUNITY_OUTREACH = 'COMMUNITY_OUTREACH',
   RESEARCH_DEVELOPMENT = 'RESEARCH_DEVELOPMENT',
}
