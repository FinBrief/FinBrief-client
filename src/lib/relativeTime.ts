export function relativeTime(date: string) {
  const now = new Date();
  const postDate = new Date(date);
  const diffTime = (Math.abs(now.getTime() - postDate.getTime())) / (1000 * 60);

  if (diffTime < 60) {
    return Math.round(diffTime) === 1 ? 
      `${Math.round(diffTime)} min ago` : 
      `${Math.round(diffTime)} mins ago`;
  } 
  else if (diffTime < 1440) 
  {
    return Math.round(diffTime / 60) === 1 ? 
      `${Math.round(diffTime / 60)} hour ago` : 
      `${Math.round(diffTime / 60)} hours ago`;
  } 
  else if (diffTime < 10080) 
  {
    return Math.round(diffTime / 1440) === 1 ? 
      `${Math.round(diffTime / 1440)} day ago` : 
      `${Math.round(diffTime / 1440)} days ago`;
  }
  else {
    return postDate.toDateString().split(' ').slice(1).join(' ');
  }
}