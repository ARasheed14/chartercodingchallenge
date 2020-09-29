const extractGenreList = (list: any[]) => {
    const seperatedList: any[] = [];
    list.forEach((element: { genre: string; }) => {
      const sep = element.genre.split(',');
      seperatedList.push(sep);
    });
    const flattendList = Array.prototype.concat.apply([], seperatedList);
    const refinedList = removeDuplicateListItems(flattendList);
    return refinedList;
  }
  
  const extractStateList = (list: any[]) => {
    const refinedList: any[] = [];
    list.forEach((element: { state: any; }) => {
      const state = element.state;
      refinedList.push(state);
    });
    const stateList = removeDuplicateListItems(refinedList);
    return stateList;
  }
  
  const removeDuplicateListItems = (list: any) => {
    return [...new Set(list)];
  }
export default {
    extractGenreList,
    extractStateList
}