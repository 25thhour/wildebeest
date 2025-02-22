import { component$, Resource, useResource$, useStylesScoped$ } from '@builder.io/qwik'
import { links } from '~/dummyData'
import { MastodonLink } from '~/types'
import { formatHistory } from '~/utils/history'
import styles from './index.scss?inline'

export default component$(() => {
	useStylesScoped$(styles)

	const resource = useResource$<MastodonLink[]>(async () => {
		return links
	})

	return (
		<>
			<Resource
				value={resource}
				onPending={() => <div>loading...</div>}
				onRejected={() => <div>failed</div>}
				onResolved={(links) => (
					<>
						{links.map((link) => (
							<a href={link.url} class="no-underline" target="_blank">
								<div class="p-4 flex justify-between border-b border-wildebeest-600 hover:bg-wildebeest-700">
									<div class="mr-6">
										<div class="my-2 text-sm text-wildebeest-400">{link.provider_name}</div>
										<div class="mb-2 text-lg text-bold leading-normal">{link.title}</div>
										<div class="text-sm text-wildebeest-400">{formatHistory(link.history)}</div>
									</div>
									<div>
										<img class="thumbnail" src={link.image} />
									</div>
								</div>
							</a>
						))}
					</>
				)}
			/>
		</>
	)
})
