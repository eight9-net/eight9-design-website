<style lang="scss">
.contact-content {
  background-color: rgba(255, 255, 255, .25);
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "contact-section",
  components: {  },
  data() {
    return {
      status: 'pending',
      form: {
        dirty: false,
        is_sent: false,
        is_disabled: false,
        name_valid: true,
        email_valid: true,
        subject_valid: true,
        message_valid: true,
        submit_valid: true,
        replyTo: "@",
        honeypot: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        subject: "",
        message: "",
      }
    };
  },
  computed: {
      ...mapGetters([
        'get_site_info',
      ]),
      site() {
        return this.get_site_info;
      },
    },
  methods: {
    ...mapActions([
        'do_submit_contact',
      ]),
    send_message() {
      let $this = this;
      let form = this.form;
      if (!this.validate_form(true)) {
        this.status = 'missing';
        return;
      }
      form.is_disabled = true;
      this.status = 'sending';
      if (form.honeypot.length > 0) {
        // Ignore Honeypots
        $this.status = 'success';
      } else {
        let request = JSON.stringify({app_key: 'eight9', name: form.name, email: form.email, subject: form.subject, phone: form.phone, message: form.message});
        this.do_submit_contact(request)
          .then(function(res) {
            $this.status = 'success';
          }).finally(function() {
          }).catch(function(err) {
            $this.status = 'error';
            form.is_disabled = false;
          });
        }
    },
    validate_form(whole_form = false) {
      if (whole_form) console.log('Validate Whole Form');
      let form = this.form;
      let name = form.name;
      if (name || whole_form) {
        form.dirty = true;
        form.name_valid = false;
        if (name.length >= 3) {
          form.name_valid = true;
        }
      }
      let email = form.email;
      if (email || whole_form) {
        form.dirty = true;
        form.email_valid = false;
        if (email.length >= 6 && email.includes("@") && email.includes(".")) {
          this.form.email_valid = true;
        }
      }
      let subject = form.subject;
      if (subject || whole_form) {
        form.dirty = true;
        form.subject_valid = false;
        if (subject.length >= 5) {
          form.subject_valid = true;
        }
      }
      let message = form.message;
      if (message || whole_form) {
        form.dirty = true;
        form.message_valid = false;
        if (message.length >= 20) {
          form.message_valid = true;
        }
      }
      if (form.dirty && whole_form && form.message_valid && form.name_valid && form.subject_valid) return true;
      return false;
    },
  },
  mounted() {

  },
  watch: {
    "form.name": function (new_val) {
      this.validate_form();
    },
    "form.email": function (new_val) {
      this.validate_form();
    },
    "form.subject": function (new_val) {
      this.validate_form();
    },
    "form.message": function (new_val) {
      this.validate_form();
    },
  },
}

</script>

<template>
  <section id="section-contact" class="w-full contact-content mt-12 mb-12 pb-12">
    <div>
      <div class="text-center">
        <h2>Contact</h2>
        <p>Want more information? Not sure what your business needs? Have some ideas already and not sure where to start?</p>
        <p>We would love to talk about how we can help your business. Send us a message and start a conversation. Use the form below or E-Mail us at <a :href="'mailto:' + site.info + '?subject=Website%20Inquiry'">{{ site.email }}</a></p>
      </div>


      <!-- contact form -->
      <form action="javascript://" id="contact_form" class="contact-form mb-4" :class="{'hidden': form.is_sent, 'opacity-50 pointer-events-none': form.is_disabled}" @submit.prevent="send_message">
        <input type="hidden" name="accessKey" :value="site.static_forms_key" />
        <input type="hidden" name="replyTo" :value="form.replyTo" />
        <input type="text" name="honeypot" class="sr-only" v-model="form.honeypot" />

        <!-- Row 1: name / email / phone -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="input-group">
            <span class="input-group-text"><font-awesome-icon :icon="['fas', 'user']" /></span>
            <input type="text" class="form-control" :class="{'is-invalid': form.dirty && !form.name_valid, 'is-valid': form.dirty && form.name_valid && form.name}" name="contact_name" placeholder="Your Name" aria-label="Your Name" required v-model="form.name" />
          </div>
          <div class="input-group">
            <span class="input-group-text"><font-awesome-icon :icon="['fas', 'at']" /></span>
            <input type="text" class="form-control" :class="{'is-invalid': form.dirty && !form.email_valid, 'is-valid': form.dirty && form.email_valid && form.email}" name="contact_email" placeholder="E-Mail Address" aria-label="E-Mail Address" required v-model="form.email" />
          </div>
          <div class="input-group">
            <span class="input-group-text"><font-awesome-icon :icon="['fas', 'phone']" /></span>
            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" class="form-control" name="contact_phone" placeholder="Phone" aria-label="Phone" v-model="form.phone" />
          </div>
        </div>

        <!-- Subject -->
        <div class="input-group mb-4">
          <span class="input-group-text"><font-awesome-icon :icon="['fas', 'question']" /></span>
          <input type="text" class="form-control" :class="{'is-invalid': form.dirty && !form.subject_valid, 'is-valid': form.dirty && form.subject_valid && form.subject}" name="contact_subject" placeholder="Subject" aria-label="Subject" required v-model="form.subject" />
        </div>

        <!-- Message -->
        <div class="mb-4">
          <textarea class="form-control rounded-md" :class="{'is-invalid': form.dirty && !form.message_valid, 'is-valid': form.dirty && form.message_valid && form.message}" placeholder="Your Message" aria-label="Your Message" required v-model="form.message" rows="10"></textarea>
        </div>

        <div>
          <a class="btn-primary" href="javascript://" :class="{'disabled': form.is_disabled}" @click="send_message">
            <font-awesome-icon :icon="['fas', 'envelope']" class="mr-1"/> Contact Us
          </a>
        </div>
      </form><!-- end contact form -->

      <div>
        <div class="alert alert-success" role="alert" v-if="status == 'success'">
          <h4 class="alert-heading">Message Sent</h4>
          <p>Thanks for sending your message! We'll get back to you shortly.</p>
        </div>
        <div class="alert alert-danger" role="alert" v-if="status == 'error'">
          <h4 class="alert-heading">Error Sending Message</h4>
          <p>There was a problem sending your message. Please try again.</p>
        </div>
        <div class="alert alert-danger" role="alert" v-if="status == 'missing'">
          <h4 class="alert-heading">Form Incomplete</h4>
          <p>Please complete all the fields in the form before sending.</p>
        </div>
      </div>


      <!-- Addresses -->
      <div class="mt-6 text-center">
        <h3><font-awesome-icon :icon="['fas', 'location-dot']"></font-awesome-icon> Mailing Address</h3>
        <address>
            {{ site.address1 }}<br />
            {{ site.address2 }}<br />
        </address>
      </div><!-- end addresses section -->


    </div>
  </section>


  <div id="contact" class="relative pb-20 bg-white">
    <div class="container mx-auto px-4 max-w-6xl">

    </div>
  </div><!-- End contact -->


</template>
