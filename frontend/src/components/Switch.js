const Switch = () => (
  <div>
    <h2>This is a roster page!</h2>
    <Switch>
			<Route path="/:category" render={()=>(
				<PostsList />
			)} />
       		<Route path="/:category/:id" render={()=>(
				<DetailedPost />
			)} />
       		<Route path="/posts/:id/edit" render={()=>(
				<PostCreateEdit />			
    </Switch>
  </div>
)