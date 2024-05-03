 

const getTotalComments = (user) => {
  // Obtener los comentarios del usuario
  
 

const userAutomobiles = user.posts || [];
  
// Obtener el total de likes en los posts del usuario
const totalcomments = userAutomobiles.reduce((total, post) => {
  return total + post.comments.length;
}, 0);

return totalcomments ;
};

  

export default getTotalComments;
