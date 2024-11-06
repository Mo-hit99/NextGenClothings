export function ShowByTime(time){
    const hour12 = new Date(time);
    const option = { hour: 'numeric', minute: 'numeric', hour12: true}
    return hour12.toLocaleString('en-US',option)
}