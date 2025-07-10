import axios from "axios";



const instance=axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmRjNTAyZjAyOGUzYzE2ODhjZjNmNTRmNzQ3ODdkNiIsIm5iZiI6MTc1MTkxMTc0OS4wNzAwMDAyLCJzdWIiOiI2ODZjMGQ0NWViNmRlN2FlYWU5YTQzZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Nlf3PCC8x91bg2NhKcFsTUC7vmBlFKsH6FN5oiSF0mE'

  }

})

export default instance