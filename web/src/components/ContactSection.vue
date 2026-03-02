<script setup>
  import { ref } from 'vue';
  import { useContactStore } from '../stores/contact';

  const isDisabledRef = ref(false);
  const messageSentRef = ref(false);
  const messageErrorRef = ref(false);
  const contactStore = useContactStore();
  const form = ref(contactStore.form);

  function sendContactForm(data) {
    if (isDisabledRef.value) {
      console.error('Form is disabled...');
      // return;
    }
    messageErrorRef.value = false;
    isDisabledRef.value = true;
    form.value.subject = form.value.subject + ' ' + form.value.company + ' (' + form.value.name + ')';
    contactStore.doSendContactForm(form.value).then((success) => {
      messageSentRef.value = success;
    }).catch(() => {
      isDisabledRef.value = false;
      messageErrorRef.value = true;
    });
  }
</script>

<template>
  <section id="section-contact" class="w-full contact-content mt-12 mb-12 pb-12">
    <div>
      <div class="text-center">
        <h2>Contact</h2>
        <p>Want more information? Not sure what your business needs? Have some ideas already and not sure where to start?</p>
        <p>We would love to talk about how we can help your business. Send us a message and start a conversation. Use the form below or E-Mail us at <a :href="'mailto:' + siteProperties.email + '?subject=Website%20Inquiry'">{{ siteProperties.email }}</a></p>
      </div>


      <!-- contact form -->
      <form @submit.prevent="sendContactForm" id="contact_form" class="contact-form mb-4" :class="{'hidden': form.is_sent, 'opacity-50 pointer-events-none': form.is_disabled}">
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

      <div v-if="messageSentRef" class="p-4 my-4 text-green-800 bg-green-200 border border-green-400 rounded">
        <p>Thank you for contacting us! We have received your message and will get back to you shortly.</p>
      </div>
      <div v-if="messageErrorRef" class="p-4 my-4 text-red-800 bg-red-200 border border-red-400 rounded">
        <p>There was an error sending your message. Please try again or email us directly.</p>
      </div>

      <!-- Addresses -->
      <div class="mt-6 text-center">
        <h3><font-awesome-icon :icon="['fas', 'location-dot']"></font-awesome-icon> Mailing Address</h3>
        <address>
            {{ siteProperties.address }}<br />
        </address>
      </div><!-- end addresses section -->


    </div>
  </section>


  <div id="contact" class="relative pb-20 bg-white">
    <div class="container mx-auto px-4 max-w-6xl">

    </div>
  </div><!-- End contact -->


</template>
