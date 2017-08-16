console.log('Vanilla JS is working fine!')

function confirmDelete(reviewID) {
  if (confirm('Are you sure you want to delete this review?')) {
    fetch('/reviews/' + reviewID, {
      method: 'DELETE',
      credentials: 'include'
    }).then(location.reload())
  }
}
