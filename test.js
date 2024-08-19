async function myFunction(){
    try {
        var result = await request((result, err))
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    
}
/**
 * it('should ___', ()=>{
 *  except(myFunction(2,6).toBe(12))
 * })
 */
function myFunction(a, b){
    return a * b;
}
it('should multiply arguments', ()=>{
    expect(myFunction(2, 6)).toBe(12)
})