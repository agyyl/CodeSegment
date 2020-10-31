this.$confirm('评论删除后不可恢复，确认删除？','提示',{
  type: 'warning',
}).then(()=>{
  this.deleteMessage(id);

}).catch(()=>{

});
