<script setup>
  import { ref } from 'vue';
  import { useContactStore } from '../stores/contact';
import ContentFullSection from './ContentFullSection.vue';

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
  <ContentFullSection
    id="ContactUs"
    name="contact-us"
    title="Contact Us"
    image="bg2.jpg"
    sectionClasses="mb-10"
    backdropClasses="bg-gray-800/80 rounded-lg"
    :button="false"
  >
    <div>
      
      <div class="text-center mb-8">
        <p class="text-base-content/70 my-5">Want more information? Not sure what your business needs? Have some ideas already and not sure where to start?</p>
        <p class="text-base-content/70 my-5">We would love to talk about how we can help your business. Send us a message and start a conversation. Use the form below or E-Mail us at <a class="link link-primary" :href="'mailto:' + siteProperties.contactEmail + '?subject=Website%20Inquiry'">{{ siteProperties.contactEmail }}</a></p>
      </div>

      <!-- contact form -->
      <form @submit.prevent="sendContactForm" id="contact_form" class="p-4 fieldset rounded-box text-base-content" :class="{'hidden': messageSentRef, 'opacity-50 pointer-events-none': isDisabledRef}">
        <input type="hidden" name="replyTo" :value="form.replyTo" />
        <input type="text" name="honeypot" class="sr-only" v-model="form.honeypot" />

        <div class="flex gap-4">
          <fieldset class="fieldset flex-3">
            <label class="w-full input validator">
              <input
                type="text"
                required
                name="name"
                placeholder="Contact Name"
                minlength="1"
                maxlength="50"
                v-model="form.name"
              />
            </label>
          </fieldset>

          <fieldset class="fieldset flex-3">
            <label class="w-full input validator">
              <input
                type="text"
                name="title"
                placeholder="Title"
                minlength="1"
                maxlength="50"
                v-model="form.title"
              />
            </label>
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-3">
            <label class="w-full input validator">
              <FontAwesomeIcon :icon="['fas', 'phone']" class="icon" />
              <input
                type="tel"
                class="tabular-nums"
                required
                placeholder="Phone"
                minlength="10"
                maxlength="15"
                v-model="form.phone"
              />
            </label>
            <p class="hidden validator-hint">Must be at least 10 digits</p>
          </fieldset>

          <fieldset class="fieldset flex-3">
            <label class="w-full input validator">
              <FontAwesomeIcon :icon="['fas', 'envelope']" class="icon" />
              <input type="email" placeholder="Email" required v-model="form.email" />
            </label>
            <div class="hidden validator-hint">Enter valid email address</div>
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-3">
            <label class="w-full input validator">
              <input
                type="text"
                required
                name="subject"
                placeholder="Subject"
                minlength="1"
                maxlength="150"
                v-model="form.subject"
              />
            </label>
            <div class="hidden validator-hint">Subject is required</div>
          </fieldset>
          <fieldset class="fieldset flex-3">
            <label class="w-full input validator">
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                minlength="1"
                maxlength="150"
                v-model="form.company"
              />
            </label>
          </fieldset>
        </div>

        <div class="hidden"><input type="text" name="is_valid" v-model="form.is_valid"/></div>


        <div class="flex gap-4">
          <fieldset class="fieldset flex-3">
            <textarea id="contact_message" class="w-full textarea" placeholder="Message" v-model="form.message" rows="5" required></textarea>
            <div class="hidden validator-hint">Message is required</div>
          </fieldset>
        </div>

        <button type="submit" class="my-4 btn btn-primary" :class="{disabled: isDisabledRef}" :disabled="isDisabledRef">Send Message</button>
      </form>

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

      <!-- Phone -->
      <div class="mt-6 text-center text-base-content/70">
        <h3 class="text-lg font-semibold text-base-content mb-1">
          <font-awesome-icon :icon="['fas', 'phone']" class="text-primary mr-1" /> Phone
        </h3>
        <a :href="`tel:${siteProperties.contactPhone}`" class="not-italic">{{ siteProperties.contactPhoneFormatted }}</a>
      </div>

    </div>
  </ContentFullSection>

</template>
