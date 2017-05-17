(function displayContent() {
  var trigger = document.getElementById('collapseTrigger');
  var collapsibleContent = document.getElementsByClassName('collapsibleContent')[0];
  var collapseTriggerWrapper = document.getElementsByClassName('collapseTriggerWrapper')[0];
  var collapsibleClasses = collapsibleContent.classList;
  var triggerClasses = trigger.classList;

  collapseTriggerWrapper.addEventListener('click', function() {
    if (collapsibleClasses.contains('expandedContent')) {
      console.log('??');
      collapsibleClasses.remove('expandedContent');
      collapsibleClasses.add('collapsedContent');

      triggerClasses.remove('upwards');
      triggerClasses.add('downwards');
    } else {
      console.log('k');
      collapsibleClasses.add('expandedContent');
      collapsibleClasses.remove('collapsedContent');

      triggerClasses.add('upwards');
      triggerClasses.remove('downwards');
    }
  }, false);
})();
