import React from 'react';
import Header from '../components/Layouts/Header';

function Base({ children }){
  return (
    <>
      <div className="base-layout">
        <main className="page-container">
          <Header />
          {children}
        </main>
      </div>
    </>
  )
}

export default Base
