import React, { lazy, Suspense } from 'react';

const CardSection  = lazy(()=> import('card/CardList').catch( () => {
  return { default: () => <div className='error'>Component is not available!</div> };
}));
const ProfileSection  = lazy(()=> import('user/ProfileSection').catch( () => {
  return { default: () => <div className='error'>Component is not available!</div> };
}));


function Main() {
  return (
    <main className="content">
      <Suspense fallback={<div>Loading... </div>}>
        <ProfileSection/>
      </Suspense>
      <Suspense fallback={<div>Loading... </div>}>
        <CardSection/>
      </Suspense>
    </main>
  );
}

export default Main;
