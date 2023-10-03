
export const url = "regmed_ms"
export const port = "5000"
export const entryPoint = "medicalRecord"

/*
I have the following requests in the server:

wget --no-check-certificate --quiet \
  --method POST \
  --timeout=0 \
  --header 'Content-Type: application/json' \
  --body-data '{
    "detail": "New Record"
}
' \
   'http://localhost:5000/medicalRecord/create'

{
    "success": true,
    "data": {
        "id": 1,
        "detail": "New Record",
        "createdAt": "2023-10-03T03:44:16.267Z",
        "updatedAt": "2023-10-03T03:44:16.267Z"
    }
}



wget --no-check-certificate --quiet \
  --method POST \
  --timeout=0 \
  --header 'Content-Type: application/json' \
  --body-data '{
      "ids": [1, 2, 5]
}' \
   'http://localhost:5000/medicalRecord/getMany'
Returns:
{
    "success": true,
    "data": [
        {
            "id": 1,
            "detail": "New Record",
            "createdAt": "2023-10-03T03:44:16.267Z",
            "updatedAt": "2023-10-03T03:44:16.267Z"
        }
    ]
}

wget --no-check-certificate --quiet \
  --method POST \
  --timeout=0 \
  --header 'Content-Type: application/json' \
  --body-data '{
      "ids": [1, 2, 5]
}' \
   'http://localhost:5000/medicalRecord/getMany'

returns 
{
    "success": true,
    "data": [
        {
            "id": 1,
            "detail": "New Record",
            "createdAt": "2023-10-03T03:44:16.267Z",
            "updatedAt": "2023-10-03T03:44:16.267Z"
        }
    ]
}

wget --no-check-certificate --quiet \
  --method GET \
  --timeout=0 \
  --header '' \
   'http://localhost:5000/medicalRecord/get/1'
returns
{
    "success": true,
    "data": {
        "id": 1,
        "detail": "New Record",
        "createdAt": "2023-10-03T03:44:16.267Z",
        "updatedAt": "2023-10-03T03:44:16.267Z"
    }
}

wget --no-check-certificate --quiet \
  --method GET \
  --timeout=0 \
  --header '' \
   'http://localhost:5000/medicalRecord/getAll'
returns
{
    "success": true,
    "data": [
        {
            "id": 1,
            "detail": "New Record",
            "createdAt": "2023-10-03T03:44:16.267Z",
            "updatedAt": "2023-10-03T03:44:16.267Z"
        }
    ]
}

Next the correspointing requests in the gateway mapped from the corresponding graphql queries and mutations in typeDefsRegMed.js:
*/