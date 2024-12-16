<script lang="ts">
	import { MONTHS } from '$lib/constants/month'
	import type { Payment } from '$lib/server/schemas/payments'
	import { formatter } from '$lib/utils/formatter'
	import { CheckIcon, XIcon, PenIcon } from 'lucide-svelte'
	import { twMerge } from 'tailwind-merge'
	import { AccordionItem } from '@skeletonlabs/skeleton'
	import { slide } from 'svelte/transition'
	import { cubicInOut } from 'svelte/easing'

	const { month, payments }: { month: number; payments: Payment[] } = $props()

	let open = $state(false)

	const total = $derived(
		payments.reduce((acc, payment) => acc + payment.sum, 0),
	)

	const totalOriginal = $derived(
		payments.reduce(
			(acc, payment) => {
				if (!payment.originalCurrency) return acc
				acc[payment.originalCurrency] += payment.originalSum || 0
				return acc
			},
			{ EUR: 0, USD: 0 },
		),
	)

	let editedPayment: Payment['id'] | undefined = $state()
</script>

<div
	class={twMerge(
		'rounded-xl border-y-2 border-b-primary-200 border-t-surface-900 px-2 pt-2 hover:border-b-primary',
		'transition-colors duration-300 ease-out',
		open && 'border-primary',
	)}
>
	<AccordionItem
		bind:open
		regionControl="py-2 px-0"
		regionPanel="pt-2 pb-4 px-0"
		transitionIn={slide}
		transitionInParams={{ duration: 200, easing: cubicInOut }}
	>
		<svelte:fragment slot="summary">
			<div
				class={twMerge(
					'text-md flex justify-between rounded-xl border-b-[1px] border-surface-900 p-2 px-4 font-medium',
					'transition-colors duration-300 ease-out',
					open && 'border-primary',
				)}
			>
				<div>{MONTHS[month]}</div>
				<div class="flex gap-8">
					<span>
						{formatter('UAH').format(total)}
					</span>
					<span>/</span>
					<span>
						{formatter('EUR').format(totalOriginal.EUR)}
					</span>
					<span>-</span>
					<span>
						{formatter('USD').format(totalOriginal.USD)}
					</span>
				</div>
			</div>
		</svelte:fragment>

		<svelte:fragment slot="content">
			<div class="flex gap-2">
				<div class="flex-1">
					{#each payments as payment}
						<div class="flex items-center gap-2">
							<div class="text-xl">{formatter('UAH').format(payment.sum)}</div>
							<button
								type="button"
								class="variant-outline-primary btn-icon btn-icon-sm ml-4 rounded-lg"
								onclick={() => (editedPayment = payment.id)}
							>
								<PenIcon size="16" />
							</button>
							<form action="?/delete" method="post">
								<input type="hidden" name="id" value={payment.id} />
								<button
									type="submit"
									class="variant-outline-primary btn-icon btn-icon-sm rounded-lg"
								>
									<XIcon size="16" />
								</button>
							</form>
						</div>
					{/each}
				</div>

				<form
					class="flex flex-1 flex-col gap-2"
					method="post"
					action="?/{editedPayment ? 'update' : 'insert'}"
				>
					<input name="id" type="hidden" value={editedPayment} />

					<label
						class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					>
						<div class="input-group-shim">сума</div>
						<input
							name="sum"
							type="text"
							class="input block w-full"
							required
							value={editedPayment
								? payments.find((payment) => payment.id === editedPayment)?.sum
								: ''}
						/>
					</label>

					<label
						class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					>
						<div class="input-group-shim">дата</div>
						<input
							name="date"
							type="date"
							class="input block w-full"
							required
							value={editedPayment
								? payments.find((payment) => payment.id === editedPayment)?.date
								: ''}
						/>
					</label>

					<label
						for="originalSum"
						class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					>
						<div class="whitespace input-group-shim">сума в валюті</div>
						<input
							id="originalSum"
							name="originalSum"
							type="text"
							class="input block w-full"
							value={editedPayment
								? payments.find((payment) => payment.id === editedPayment)
										?.originalSum
								: ''}
						/>

						<select
							name="originalCurrency"
							class="select input-group-shim"
							value={editedPayment
								? payments.find((payment) => payment.id === editedPayment)
										?.originalCurrency
								: ''}
						>
							<option value="EUR">EUR</option>
							<option value="USD">USD</option>
						</select>
					</label>

					<div class="flex gap-2">
						<button
							type="submit"
							class="variant-outline-primary btn-icon btn-icon-sm ml-auto rounded-lg"
						>
							<CheckIcon size="16" />
						</button>
						<button
							type="reset"
							class="variant-outline-primary btn-icon btn-icon-sm rounded-lg"
							onclick={() => (editedPayment = undefined)}
						>
							<XIcon size="16" />
						</button>
					</div>
				</form>
			</div>
		</svelte:fragment>
	</AccordionItem>
</div>
