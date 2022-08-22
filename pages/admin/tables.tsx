import React from "react";
import { useQuery } from '@tanstack/react-query'
import axios from '@plugins/axios'

// components

import CardTable from "components/Cards/CardTable.js";

// layout for page

import Admin from "layouts/Admin.js";

const Tables: NextPage = () => {

  const { isLoading, error, data } = useQuery(['repoData'], () => axios.get('https://jsonplaceholder.typicode.com/posts'))

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="mt-12 pt-12">            
            
            {
              JSON.stringify(data)
            }

          </div>
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;

export default Tables
