<script setup>
  import { ref } from 'vue';
  import { useContactStore } from '../stores/contact';

  const isDisabledRef = ref(false);
  const messageSentRef = ref(false);
  const messageErrorRef = ref(false);
  const contactStore = useContactStore();
  const form = ref(contactStore.form);

  function sendContactForm() {
    if (isDisabledRef.value) {
      console.error('Form is disabled...');
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
  <section id="section-contact" class="w-full mt-12 mb-12 pb-12">
    <div>
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-base-content mb-3">Contact</h2>
        <p class="text-base-content/70">Want more information? Not sure what your business needs? Have some ideas already and not sure where to start?</p>
        <p class="text-base-content/70">We would love to talk about how we can help your business. Send us a message and start a conversation. Use the form below or E-Mail us at <a class="link link-primary" :href="'mailto:' + siteProperties.contactEmail + '?subject=Website%20Inquiry'">{{ siteProperties.contactEmail }}</a></p>
      </div>

      <!-- contact form -->
      <form @submit.prevent="sendContactForm" id="contact_form" class="mb-4" :class="{'hidden': messageSentRef, 'opacity-50 pointer-events-none': isDisabledRef}">
        <input type="hidden" name="replyTo" :value="form.replyTo" />
        <input type="text" name="honeypot" class="sr-only" v-model="form.honeypot" />

        <!-- Row 1: name / email / phone -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <label class="input input-bordered flex items-center gap-2 w-full" :class="{'input-error': form.dirty && !form.name_valid, 'input-success': form.dirty && form.name_valid && form.name}">
            <font-awesome-icon :icon="['fas', 'user']" class="text-base-content/40 shrink-0" />
            <input type="text" class="grow" name="contact_name" placeholder="Your Name" aria-label="Your Name" required v-model="form.name" />
          </label>
          <label class="input input-bordered flex items-center gap-2 w-full" :class="{'input-error': form.dirty && !form.email_valid, 'input-success': form.dirty && form.email_valid && form.email}">
            <font-awesome-icon :icon="['fas', 'at']" class="text-base-content/40 shrink-0" />
            <input type="email" class="grow" name="contact_email" placeholder="E-Mail Address" aria-label="E-Mail Address" required v-model="form.email" />
          </label>
          <label class="input input-bordered flex items-center gap-2 w-full">
            <font-awesome-icon :icon="['fas', 'phone']" class="text-base-content/40 shrink-0" />
            <input type="tel" class="grow" name="contact_phone" placeholder="Phone" aria-label="Phone" v-model="form.phone" />
          </label>
        </div>

        <!-- Subject -->
        <label class="input input-bordered flex items-center gap-2 w-full mb-4" :class="{'input-error': form.dirty && !form.subject_valid, 'input-success': form.dirty && form.subject_valid && form.subject}">
          <font-awesome-icon :icon="['fas', 'question']" class="text-base-content/40 shrink-0" />
          <input type="text" class="grow" name="contact_subject" placeholder="Subject" aria-label="Subject" required v-model="form.subject" />
        </label>

        <!-- Message -->
        <div class="mb-4">
          <textarea
            class="textarea textarea-bordered w-full"
            :class="{'textarea-error': form.dirty && !form.message_valid, 'textarea-success': form.dirty && form.message_valid && form.message}"
            placeholder="Your Message"
            aria-label="Your Message"
            required
            v-model="form.message"
            rows="10"
          ></textarea>
        </div>

        <div>
          <button type="submit" class="btn btn-primary" :disabled="isDisabledRef">
            <font-awesome-icon :icon="['fas', 'envelope']" class="mr-1" /> Contact Us
          </button>
        </div>
      </form><!-- end contact form -->

      <div v-if="messageSentRef" class="alert alert-success my-4">
        <p>Thank you for contacting us! We have received your message and will get back to you shortly.</p>
      </div>
      <div v-if="messageErrorRef" class="alert alert-error my-4">
        <p>There was an error sending your message. Please try again or email us directly.</p>
      </div>

      <!-- Address -->
      <div class="mt-6 text-center text-base-content/70">
        <h3 class="text-lg font-semibold text-base-content mb-1">
          <font-awesome-icon :icon="['fas', 'location-dot']" class="text-primary mr-1" /> Mailing Address
        </h3>
        <address class="not-italic">{{ siteProperties.companyAddress }}</address>
      </div>

    </div>
  </section>

  <div id="contact" class="relative pb-20"></div>

</template>
