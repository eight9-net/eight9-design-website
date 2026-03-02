<style scoped>

</style>

<script>
  export default {
    name: 'contact-view',
    components: {
    },
    data () {
      return {
        form: {
          name: '',
          email: '',
          subject: '',
          message: '',
        },
        status: 'pending',
        disabled: false,
      }
    },
    methods: {
      ...mapActions([
        'do_submit_contact',
      ]),
      submit() {
        let $this = this;
        if (!this.form.name || !this.form.email || !this.form.subject || !this.form.message) {
          this.status = 'missing';
          return false;
        }
        this.status = 'sending';
        this.disabled = true;
        this.do_submit_contact(this.form)
          .then(function(res) {
            $this.$set($this, 'status', 'success');
            this.status = 'success';
          }).finally(function() {
            
          }).catch(function(err) {
            this.status = 'error';
            this.disabled = false;
          });
      }
    },
  }
</script>

<template>
  <div class="services">


    <!-- Services section -->
    <section id="services-info" class="mt-12">
      <div class="w-full px-4">
        <div class="flex flex-wrap text-center">
          <div class="content-head center w-full">
            <h3 class="center_divider">Services</h3>
          </div>

          <div class="clearfix"> </div>
          <div class="w-full md:w-1/4 aligncenter">
            <div class="service_block">
              <span class="icon bg-white"><i class="icon"><font-awesome-icon :icon="['fas', 'phone']" /></i></span>
              <h5>Phone</h5>
              <span class="text-sm">Phone: <a :href="'tel:' + site.phone" class="ci-link">{{ site.phone }}</a></span>
              <!--<span class="text-sm">Fax : {{ fax }}</span>-->
            </div>
          </div>

          <div class="w-full md:w-1/4 aligncenter">
            <div class="service_block">
              <span class="icon bg-white"><i class="icon"><font-awesome-icon :icon="['fas', 'location-dot']" /></i></span>
              <h5>Address</h5>
              <address>
                <span class="text-sm">{{ site.address1 }}</span>
                <span class="text-sm">{{ site.address2 }}</span>
              </address>
            </div>
          </div>

          <div class="w-full md:w-1/4 aligncenter">
            <div class="service_block">
              <span class="icon bg-white"><i class="icon"><font-awesome-icon :icon="['fas', 'envelope']" /></i></span>
              <h5>Email & website</h5>
              <span class="text-sm"><a :href="'mailto:' + site.email + '?subject=Website Inquiry'" class="ci-link">{{ site.email }}</a></span>
              <span class="text-sm"><a :href="site.website" class="ci-link">{{ site.website }}</a></span>
            </div>
          </div>

          <div class="w-full md:w-1/4 aligncenter">
            <div class="service_block">
              <span class="icon bg-white"><i class="icon"><font-awesome-icon :icon="['fas', 'question']" /></i></span>
              <h5>Got Questions ?</h5>
              <span class="text-sm">Give us a call with any questions.</span>
              <span class="text-sm"><a :href="'tel:' + site.phone" class="ci-link">Call us at: {{ site.phone }}</a></span>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>
